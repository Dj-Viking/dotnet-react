import React, { useEffect, useState } from "react";

interface Forecast {
    date: string;
    temperatureF: string;
    temperatureC: string;
    summary: string;
    adjacentCities: string[];
}

const FetchData: React.FC<{}> = () => {

    const [forecasts, setForecasts] = useState<Forecast[]>([]);

    async function populateWeatherData(): Promise<Forecast[]> {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        document.title = "this is a test";
        (async (): Promise<void> => {
            const await_me = await populateWeatherData() as Forecast[];
            console.log("here");

            setTimeout(() => {
                setForecasts(await_me);
            }, 300);
        })();
        return () => void 0;
    }, []);

    return (
        <div>{forecasts.length ? forecasts.map((row) => {
            return (
                <div key={Date.now() + Math.random() * 100000} style={{ "display": "flex", justifyContent: "center", flexDirection: "column" }}>
                    <span>Date: {row.date}</span>
                    <p>Summary: {row.summary}</p>
                    <p>Temperature C: {row.temperatureC}</p>
                    <p>Temperature F: {row.temperatureF}</p>
                    <p>Adjacent Cities: </p>
                    {row.adjacentCities.map((city, i) => {
                        return (
                            <p key={i}>
                                {city}
                            </p>
                        )
                    })}
                </div>
            );
        }) : <div className="text-dark">loading...</div>}</div>
    );

}


export { FetchData };