export interface SearchSubmit {
    submitted: boolean;
    city: string;
}

export interface Forecast {
    date: string;
    temperatureF: string;
    temperatureC: string;
    summary: string;
    adjacentCities: string[];
}

export type GetCurrentWeatherDataResult = {
    status: number | null,
    data?: CurrentWeatherData | null;
} & {
    error: unknown
} | null

export type CurrentWeatherData = {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
} | null;

export interface Coord {
    lon: number;
    lat: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface Clouds {
    all: number;
}

export interface Sys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

