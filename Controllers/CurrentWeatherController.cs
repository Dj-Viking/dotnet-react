using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net.Http;
using System.Text.Json;
namespace dotnet_reactredux;

[ApiController]
public class CurrentWeatherController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly IHttpClientFactory _httpClientFactory;
    public CurrentWeatherController(IConfiguration config, IHttpClientFactory _httpClientFactory)
    {
        this._config = config;
        this._httpClientFactory = _httpClientFactory;
    }
    [HttpPost]
    [Route("/api/city-current")]
    public async Task<IActionResult> GetCityCurrentWeather([FromBody] CurrentWeatherPost body)
    {
        try
        {
            using (HttpClient httpClient = this._httpClientFactory.CreateClient("weather_api_current_weather"))
            {
                // must append ?q={cityname}&appid={API_KEY}
                HttpResponseMessage httpRes =
                    await httpClient.GetAsync(
                        $"?q={body.cityname}&appid={this._config["Api:Key"]}");

                if (httpRes.IsSuccessStatusCode)
                {
                    using Stream? contentStream =
                        await httpRes.Content.ReadAsStreamAsync();

                    var current_weather =
                        await JsonSerializer.DeserializeAsync<dynamic>(contentStream)!;

                    return Ok(new { data = current_weather, status = 200 });
                }
                else
                {
                    return BadRequest(new { error = "the request to 3rd party api not successful", status = httpRes.StatusCode });
                }
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("error during getting current city weather ===> {0}", e);
            return BadRequest(new { error = "error during getting current city weather", status = 500 });
        }
    }
}