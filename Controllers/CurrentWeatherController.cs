using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net.Http;
using System.Text.Json;
namespace dotnet_reactredux;

[ApiController]
[Route("/city-current")]
public class CurrentWeatherController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly IHttpClientFactory _httpClientFactory;
    CurrentWeatherController(IConfiguration config, IHttpClientFactory _httpClientFactory)
    {
        this._config = config;
        this._httpClientFactory = _httpClientFactory;
    }
    [HttpPost]
    [Route("/city-current")]
    public async Task<IActionResult> GetCityCurrentWeather([FromBody] dynamic body)
    {
        try
        {
            using (HttpClient httpClient = this._httpClientFactory.CreateClient("weather_api_current_weather"))
            {
                // must append ?q={cityname}&appid={API_KEY}
                HttpResponseMessage httpRes =
                    await httpClient.GetAsync(
                        $"?q={body.cityname}&appid{this._config["API_KEY:key"]}");
            }
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine("error during getting current city weather ===> {0}", e);
            return BadRequest(new { error = "error during getting current city weather", status = 500 });
        }
    }
}