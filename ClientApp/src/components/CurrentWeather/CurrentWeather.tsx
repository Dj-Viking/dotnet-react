import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CurrentWeatherData, SearchSubmit } from "../../interfaces";
import CurrentWeatherHeader from "../CurrentWeatherHeader/CurrentWeatherHeader";
import "./CurrentWeather.css"

interface CurrentWeatherProps {
    currentWeather?: null | CurrentWeatherData;
    setCitySearch: Dispatch<SetStateAction<SearchSubmit>>;

}

const CurrentWeather: React.FC<CurrentWeatherProps> = (props) => {
    const { currentWeather, setCitySearch } = props;

    function renderData(data: CurrentWeatherData): JSX.Element {
        function renderChilds(child: any): JSX.Element {
            if (Array.isArray(child)) {
                return (
                    <span>
                        {
                            child.map((item, i) => {
                                return (
                                    <span key={i}>
                                        &nbsp; {item}
                                    </span>
                                );
                            })
                        }
                    </span>
                );
            }
            if (typeof child === "object") {
                const childArr = Object.keys(child).map(key => child[key]);
                return (
                    <span>
                        {childArr.map((item, i) => {
                            return (
                                <span key={i}>
                                    &nbsp; what: {item}
                                </span>
                            );
                        })}
                    </span>
                );
            } else {
                return (
                    <span>
                        &nbsp; {child}
                    </span>
                );
            }
        }
        // @ts-ignore
        const dataArr = Object.keys(data!).map(key => data[key as any]);
        return (
            <span>
                {
                    dataArr.map((item, i) => {
                        return (
                            <span key={i}>
                                {renderChilds(item)}
                            </span>
                        );
                    })
                }
            </span>
        );

    }

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
                        setSearch(e.target.value);
                    }}
                    value={search} />
                <button type="submit">Search</button>
            </form>
            {
                currentWeather
                    ? (
                        <div style={{ display: "flex" }}>
                            <CurrentWeatherHeader currentWeather={currentWeather} />
                        </div>
                    ) : (
                        <p>
                            no weather yet
                        </p>
                    )
            }

        </div>
    );
}

export default CurrentWeather;