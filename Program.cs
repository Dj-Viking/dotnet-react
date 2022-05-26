using Microsoft.Net.Http.Headers;
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

builder.Host.ConfigureAppConfiguration((hosting_context, config) =>
{ //TODO: inject the environment here somehow to the json file name
    config.AddJsonFile("appsettings.json",
                        optional: true,
                        reloadOnChange: true);
});

// Add services to the container.
// setup app

builder.Services.AddHttpClient("weather_api_one_call", httpClient =>
{
    httpClient.BaseAddress = new Uri("https://api.openweathermap.org/data/3.0/onecall");//must append ?lat={lat}&lon={lon}&appid={API_KEY}

    httpClient.DefaultRequestHeaders.Add(
        HeaderNames.Accept, "application/json");
});
builder.Services.AddHttpClient("weather_api_current_weather", httpClient =>
{
    httpClient.BaseAddress = new Uri("https://api.openweathermap.org/data/2.5/weather"); // must append ?q={cityname}&appid={API_KEY}

    httpClient.DefaultRequestHeaders.Add(
        HeaderNames.Accept, "application/json");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
