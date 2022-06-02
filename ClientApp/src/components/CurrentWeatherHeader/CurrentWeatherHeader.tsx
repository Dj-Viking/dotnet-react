import React, { useEffect, useState, useRef, useCallback } from "react";
import { CurrentWeatherData } from "../../interfaces";
import {
    todaysDate,
    formatTime,
    convertKelvintoFC,
    convertSecondsToHours,
    searchedCityLocalTime
} from "../../utils";
import "./CurrentWeatherHeader.css"

interface CurrentWeatherHeaderProps {
    currentWeather: CurrentWeatherData;
}

const CurrentWeatherHeader: React.FC<CurrentWeatherHeaderProps> = (props) => {
    const { currentWeather } = props;
    const [time, setTime] = useState<string>(formatTime(Date.now()));
    const counterRef = useRef<NodeJS.Timer | null>(null);

    const resetTimer = useCallback(() => {
        counterRef.current = setInterval(() => {
            setTime(formatTime(Date.now()));
        }, 1000);
    }, [setTime, currentWeather?.timezone]);

    useEffect(() => {
        clearInterval(counterRef.current as NodeJS.Timer)
        resetTimer();
        return () => clearInterval(counterRef.current as NodeJS.Timer);
    }, [resetTimer]);

    return (
        <div>
            <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                    <h5 className="card-title">{currentWeather?.name} {todaysDate()} | Your Local Time: {time}</h5>
                    <p className="card-text">
                        timezone offset hours from UTC: {currentWeather?.timezone! < 0 ? "-" : "+"}{Math.abs(convertSecondsToHours(currentWeather?.timezone!))}
                    </p>
                    <p className="card-text">
                        UTC now: {new Date().toUTCString().split(" ")[4]}
                    </p>
                    <p className="card-text">
                        {currentWeather?.name} local time: {searchedCityLocalTime(convertSecondsToHours(currentWeather?.timezone!), new Date().toUTCString().split(" ")[4])}
                    </p>
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

