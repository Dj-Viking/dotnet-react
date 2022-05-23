using Microsoft.AspNetCore.Mvc;

namespace dotnet_reactredux.Controllers;

[ApiController]
[Route("/weatherforecast")]
public class WeatherForecastController : ControllerBase
{
    private readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Route("/weatherforecast")]
    public dynamic Get()
    {
        try
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)],
                AdjacentCities = new List<string>() { "warsaw", "toronto", "zagreb", "belgrade" }
            })
            .ToArray();
        }
        catch (Exception e)
        {
            Console.WriteLine("there was an error during getting the weather forecast {0}", e);
            return BadRequest(new JsonResult(new { message = "OH NO", status = 500 }));
        }
    }
}
