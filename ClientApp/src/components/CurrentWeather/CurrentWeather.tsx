import React, { Dispatch, SetStateAction, useState } from "react";
import { CurrentWeatherData, SearchSubmit } from "../../interfaces";
import CurrentWeatherHeader from "../CurrentWeatherCard/CurrentWeatherCard";
import "./CurrentWeather.css"

interface CurrentWeatherProps {
    currentWeather?: null | CurrentWeatherData;
    setCitySearch: Dispatch<SetStateAction<SearchSubmit>>;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = (props) => {
    const { currentWeather, setCitySearch } = props;

    console.log("current weather now", currentWeather);
    const [search, setSearch] = useState<string>("");

    function handleSubmit(event: any): void {
        event.preventDefault();
        console.log("submit event", event);
        setCitySearch({
            city: search,
            submitted: true
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <input
                        required
                        autoComplete="off"
                        type="text"
                        name="city"
                        style={{ width: "30%", display: "inline-block", marginRight: "1em" }}
                        className="form-control"
                        placeholder="search a city"
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        value={search} />
                    <button style={{ marginBottom: "3px" }} className="btn btn-primary" type="submit">
                        Search</button>
                </div>
            </form >
            {
                currentWeather
                    ? (
                        <div style={{ display: "flex" }} >
                            <CurrentWeatherHeader currentWeather={currentWeather} />
                        </div >
                    ) : (
                        <p>
                            no weather yet
                        </p>
                    )
            }

        </div >
    );
}

export default CurrentWeather;