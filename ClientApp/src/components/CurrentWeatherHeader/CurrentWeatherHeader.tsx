import React, { useEffect, useState, useRef } from "react";
import { CurrentWeatherData } from "../../interfaces";
import { todaysDate } from "../../utils";
import "./CurrentWeatherHeader.css"

interface CurrentWeatherHeaderProps {
    cityname: string;
    currentWeather: CurrentWeatherData;
}

const CurrentWeatherHeader: React.FC<CurrentWeatherHeaderProps> = (props) => {
    const { currentWeather, cityname } = props;
    const [time, setTime] = useState<string>("");
    const counterRef = useRef<NodeJS.Timer | null>(null);


    function createStopWatch() {
        function formatTime(date_now: number): string {
            let now = new Date(date_now);
            return `${now.getTime()} `
        }
        counterRef.current = setInterval(() => {
            console.log("formatted time", formatTime(Date.now()));
            setTime(formatTime(Date.now()));
        }, 1000);
    }

    useEffect(() => {
        if (counterRef.current !== null)
            clearInterval(counterRef.current as NodeJS.Timer);
        else
            createStopWatch();
    }, []);

    return (
        <div>
            <div className="card" style={{ width: "18rem" }}>
                <img
                    className="card-img-top"
                    style={{ height: "auto", width: "30%" }}
                    src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@2x.png`}
                    alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{cityname} {todaysDate()} time: {time}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeatherHeader;