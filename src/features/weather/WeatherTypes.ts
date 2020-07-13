import { IWeatherCurrentResponse, IWeatherForecastResponse } from './Interfaces/IWeatherApi';

export type City = string | undefined;

export type Search = { lat: number; lon: number } | { q: string };

export type WeatherApi = IWeatherForecastResponse | IWeatherCurrentResponse;

export type Type = 'weather' | 'forecast';
