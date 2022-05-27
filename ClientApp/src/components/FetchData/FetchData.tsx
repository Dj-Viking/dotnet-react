import React, { useEffect, useState } from "react";
import { Forecast, CurrentWeatherData } from "../../interfaces";
import Forecasts from "../Forecasts/Forecasts";


const FetchData: React.FC<{}> = () => {

    const [forecasts, setForecasts] = useState<Forecast[]>([]);
    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData>(null);

    async function getForecasts(): Promise<Forecast[] | void> {
        try {
            const response = await fetch("/weatherforecast");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("error during get forecasts", error);
        }
    }
    async function getCurrentWeather(): Promise<CurrentWeatherData | void> {
        try {
            const response = await fetch("/api/city-current", { method: "POST", body: JSON.stringify({ cityname: "toronto" }), headers: { "Content-Type": "application/json" } });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("error during get current weather", error);
        }
    }

    useEffect(() => {
        document.title = "this is a test";
        (async (): Promise<void> => {
            const forecastData = await getForecasts() as Forecast[];
            const currentWeatherData = await getCurrentWeather() as CurrentWeatherData;
            setTimeout(() => {
                setForecasts(forecastData);
                setCurrentWeather(currentWeatherData);
            }, 300);
        })();
    }, []);

    return (

        <div>
            <Forecasts forecasts={forecasts} />
            <div>hello world</div>
        </div>
    );

}


export { FetchData };