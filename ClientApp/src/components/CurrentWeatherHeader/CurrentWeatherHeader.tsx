import React, { useEffect, useState, useRef } from "react";
import { CurrentWeatherData } from "../../interfaces";
import { todaysDate, formatTime } from "../../utils";
import "./CurrentWeatherHeader.css"

interface CurrentWeatherHeaderProps {
    currentWeather: CurrentWeatherData;
}

const CurrentWeatherHeader: React.FC<CurrentWeatherHeaderProps> = (props) => {
    const { currentWeather } = props;
    const [time, setTime] = useState<string>(formatTime(Date.now()));
    const counterRef = useRef<NodeJS.Timer | null>(null);


    function createTimer() {

        counterRef.current = setInterval(() => {
            console.log("formatted time", formatTime(Date.now()));
            setTime(formatTime(Date.now()));
        }, 1000);

    }

    useEffect(() => {
        if (counterRef.current !== null)
            clearInterval(counterRef.current as NodeJS.Timer);
        else
            createTimer();
    }, []);

    return (
        <div>
            <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                    <h5 className="card-title">{currentWeather?.name} {todaysDate()} time: {time}</h5>
                    <img
                        className="card-img-top"
                        style={{ height: "auto", width: "10%" }}
                        src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@2x.png`}
                        alt="Card image cap" />
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeatherHeader;