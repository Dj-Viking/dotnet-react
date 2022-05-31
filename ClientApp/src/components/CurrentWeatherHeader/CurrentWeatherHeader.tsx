import React, { useEffect, useState, useRef } from "react";
import { CurrentWeatherData } from "../../interfaces";
import { todaysDate, formatTime, convertKelvintoFC } from "../../utils";
import "./CurrentWeatherHeader.css"

interface CurrentWeatherHeaderProps {
    currentWeather: CurrentWeatherData;
}

const CurrentWeatherHeader: React.FC<CurrentWeatherHeaderProps> = (props) => {
    const { currentWeather } = props;
    const city_coords = useRef<[number, number]>([currentWeather?.coord.lat!, currentWeather?.coord.lon!]);
    const [time, setTime] = useState<string>(formatTime(Date.now(), city_coords.current));
    const counterRef = useRef<NodeJS.Timer | null>(null);

    function resetTimer() {
        counterRef.current = setInterval(() => {
            setTime(formatTime(Date.now(), city_coords.current));
        }, 1000);
    }

    useEffect(() => {
        clearInterval(counterRef.current as NodeJS.Timer)
        resetTimer();
    }, []);

    return (
        <div>
            <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                    <h5 className="card-title">{currentWeather?.name} {todaysDate()} | Your Local Time: {time}</h5>
                    <img
                        className="card-img-top"
                        style={{ height: "auto", width: "10%" }}
                        src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@2x.png`}
                        alt="weather status" />
                    <p className="card-text">Temp F: {convertKelvintoFC(currentWeather!.main!.temp!.toString())[0]}</p>
                    <p className="card-text">Temp C: {convertKelvintoFC(currentWeather!.main!.temp!.toString())[1]}</p>
                    <p className="card-text">Description: {currentWeather!.weather[0].description!.toString()}</p>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeatherHeader;
