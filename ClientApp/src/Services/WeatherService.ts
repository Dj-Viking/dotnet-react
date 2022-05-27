import { CurrentWeatherData, GetCurrentWeatherDataResult } from "../interfaces";

interface IWeatherService {
    getCurrentWeather: (city: string) => Promise<GetCurrentWeatherDataResult>;
}

export default new class WeatherService implements IWeatherService {

    constructor(private _headers = {}) {
    }

    private _clearHeaders(): void {
        this._headers = {};
    }
    private _initHeaders(): void {
        this._headers = {
            ...this._headers,
            "Content-Type": "application/json"
        }
    }
    async getCurrentWeather(city: string): Promise<GetCurrentWeatherDataResult> {
        this._clearHeaders();
        this._initHeaders();
        try {
            const response = await fetch(
                "/api/city-current",
                {
                    method: "POST",
                    body: JSON.stringify({ cityname: city }),
                    headers: this._headers
                });

            if (response.status !== 200) {
                console.log("was not successful response", response.status);
                if (response.status === 404) {
                    return {
                        status: response.status,
                        data: null,
                        error: "city not found"
                    }
                } else {
                    return {
                        status: response.status,
                        data: null,
                        error: "city search request not successful"
                    }
                }
            }
            const data = await response.json();
            return {
                status: 200,
                data,
                error: null
            };
        } catch (error) {
            console.error("error", error);
            return {
                status: null,
                data: null,
                error: "error"
            }
        }
    }
}