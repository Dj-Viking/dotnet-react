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
export function formatTime(date_now: number): string {
    let now = new Date(date_now);
    return `${now.getHours() < 10 ? "0" : ""}${now.getHours()}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}:${now.getSeconds() < 10 ? "0" : ""}${now.getSeconds()} `;
}

export function convertKelvintoFC(kelvin: string): [number, number] {
    ///  F = 9/5(K - 273) + 32 
    //or F = 1.8(K - 273) + 32
    // C C = K - 273
    let farenheit = (9 / 5 * (Number(kelvin) - 273)) + 32;
    let celsius = Number(kelvin) - 273;
    return [farenheit, celsius];
}

/**
 * 
 * @param seconds +- seconds offset from UTC
 * @returns +- hours offset from UTC
 */
export function convertSecondsToHours(seconds: number): number {
    return seconds / 3600;
    // return Math.abs(seconds) / 3600;
}

export function getLocalTimeOffsetFromUTC(date_now: number, utc_hrs_offset: number, key: number): string {
    const now = new Date(date_now);

    const final_hrs = now.getHours() + Math.abs(utc_hrs_offset) + key;
    let ret_str = `${final_hrs < 10 ? "0" : ""}${final_hrs}:${now.getMinutes() < 10 ? "0" : ""}${now.getMinutes()}:${now.getSeconds() < 10 ? "0" : ""}${now.getSeconds()}`;
    return ret_str;

}
export type UTCOffsetInHours = number;
export type LocalTimeCalc = string;

export type TimezoneTable = Record<UTCOffsetInHours, LocalTimeCalc>;

export function createKey(index: number): number | void {
    switch (true) {
        case index <= 24: {
            return -index;
        }
        case index === 25: {
            return 0;
        }
        case index > 25: {
            return index - 25;
        }
        default: return void 0; //should be unreachable
    }
}

export function searchedCityLocalTime(searched_tz_offset: number, utc_now_time_str: string): string {
    let utc_now_hours: number = Number(utc_now_time_str.split(":")[0]);
    const utc_now_mins: number = Number(utc_now_time_str.split(":")[1]);
    const utc_now_secs: number = Number(utc_now_time_str.split(":")[2]);
    let new_str = "";
    (() => {
        if (searched_tz_offset < 0) {
            utc_now_hours += searched_tz_offset;
        } else {
            utc_now_hours += searched_tz_offset;
        }
    })();
    new_str = `${(utc_now_hours) < 10 ? "0" : ""}${utc_now_hours}:${utc_now_mins < 10 ? "0" : ""}${utc_now_mins}:${utc_now_secs < 10 ? "0" : ""}${utc_now_secs}`
    return new_str;
}

export function createTzTable(utc_secs_offset: number): TimezoneTable {
    let table = {} as TimezoneTable;
    for (let i = 1; i < 50; i++) {
        // console.log(`index ${i}, key ${createKey(i)}`);
        table = {
            ...table,
            [createKey(i) as number]:
                getLocalTimeOffsetFromUTC(
                    Date.now(),
                    convertSecondsToHours(utc_secs_offset),
                    createKey(i) as number)
        }
    }

    return table;
}