import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CurrentWeatherData, SearchSubmit } from "../../interfaces";
import "./CurrentWeather.css"

interface CurrentWeatherProps {
    currentWeather?: null | {
        data: CurrentWeatherData
    }
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
                <input
                    required
                    autoComplete="off"
                    type="text"
                    name="city"
                    placeholder="search a city"
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    value={search} />
                <button type="submit">Search</button>
            </form>
            {
                currentWeather
                    ?
                    <div style={{ display: "flex" }}>
                        <h3 style={{ color: "black" }}>
                            {currentWeather.data!.name}
                        </h3>
                    </div>
                    :
                    <p>
                        no weather yet
                    </p>
            }

        </div>
    );
}

export default CurrentWeather;