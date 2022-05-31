import React, { useEffect, useState, useCallback } from "react";
import { CurrentWeatherData, SearchSubmit } from "../../interfaces";
import WeatherService from "../../Services/WeatherService"
import CurrentWeather from "../../components/CurrentWeather/CurrentWeather";

const Weather: React.FC<{}> = () => {

    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData>(null);

    const [searchSubmit, setSearchSubmit] =
        useState<SearchSubmit>({
            city: "",
            submitted: false
        });

    const getCurrentWeather =
        useCallback(
            async (city: string): Promise<CurrentWeatherData | void> => {
                try {
                    // @ts-ignore something happened to my types will fix it later
                    const { data, error } =
                        await WeatherService.getCurrentWeather(city);

                    if (error) throw error;

                    return data;
                } catch (error) {
                    console.log("error during getting current weather", error);
                }
            }, []);

    useEffect(() => {
        document.title = "this is a test";
        (async (): Promise<void> => {
            if (searchSubmit.submitted) {
                const currentWeatherData = await getCurrentWeather(searchSubmit.city) as CurrentWeatherData;
                setSearchSubmit({ //reset the trigger for actually calling the api
                    city: "",
                    submitted: false
                });
                setCurrentWeather(currentWeatherData);
            }
        })();
    }, [searchSubmit.submitted]);

    return (
        <div>
            <h2>Get Current Weather of a City!</h2>
            <CurrentWeather
                setCitySearch={setSearchSubmit}
                // @ts-ignore
                currentWeather={currentWeather} />
        </div>
    );

}


export { Weather };