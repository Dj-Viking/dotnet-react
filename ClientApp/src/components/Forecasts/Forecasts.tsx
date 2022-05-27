import React, { useEffect, useState } from "react";
import "./Forecasts.css"
import { Forecast } from "../../interfaces";

const Forecasts: React.FC<{ forecasts: Forecast[] }> = (props) => {
    const { forecasts } = props;
    console.log("forecasts in component", forecasts);


    useEffect(() => {
        document.title = "Forecast";
        (async (): Promise<void> => {
            return void 0;
        })();
        return () => void 0;
    }, [forecasts.length]);

    return (
        <div>{forecasts.length ? forecasts.map((row) => {
            return (
                <div key={Date.now() + Math.random() * 100000} style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
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

export default Forecasts;