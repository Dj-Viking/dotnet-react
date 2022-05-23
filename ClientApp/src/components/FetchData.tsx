import React, { useEffect, useState } from "react";

interface Forecast {
    date: string;
    temperatureF: string;
    temperatureC: string;
    summary: string;
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
            setForecasts(await_me);
        })();
        return () => void 0;
    }, []);

    return (
        <div>{forecasts ? forecasts.map((row) => {
            return (
                <React.Fragment>
                    <div>{row.date}</div>
                    <div>{row.summary}</div>
                    <div>{row.temperatureC}</div>
                    <div>{row.temperatureF}</div>
                </React.Fragment>
            );
        }) : "spinner or some shit"}</div>
    );

}


export { FetchData };