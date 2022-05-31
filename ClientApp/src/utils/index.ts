// import tileBelt from "@mapbox/tilebelt";
// import { tz } from "moment-timezone";
// const tiles = require("../lib/timezones.json");

// console.log("tiles works?", tiles);
// const z = Object.keys(tiles)[0].split('/').map(Number)[2];

export function todaysDate(): string {
    const now = new Date();
    return `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`
}

/**
 * 
 * @param date_now number indicating the current time in unix timestamp number
 * @param coords tuple containing the lat and long coordinates of the city
 * @returns {string | ""} formatted 24hr local time of the city
 */
export function formatTime(date_now: number, coords: [number, number]): string {
    // TODO: get local time to the location of the searched city
    // function get_time_from_point(timestamp: number, point: [number, number]) {
    //     const [lat, lon] = point;
    //     const tile = tileBelt.pointToTile(lat, lon, z).join("/");
    //     console.log("tile", tile);
    //     const locale = tiles[tile as any];

    //     if (locale) return tz(new Date(timestamp), locale)
    //     else return "";
    // }

    // const str = get_time_from_point(date_now, coords);
    // console.log("time thing", str);
    let now = new Date(date_now);
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} `;
}

export function convertKelvintoFC(kelvin: string): [number, number] {
    ///  F = 9/5(K - 273) + 32 
    //or F = 1.8(K - 273) + 32
    // C C = K - 273
    let farenheit = (9 / 5 * (Number(kelvin) - 273)) + 32;
    let celsius = Number(kelvin) - 273;
    return [farenheit, celsius];
}