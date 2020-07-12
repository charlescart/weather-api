/* eslint-disable camelcase */
/* eslint-disable eol-last */
/* eslint-disable semi */

export default interface IWeatherApi {
  cod: '200';
  message: number;
  cnt: number,
  list: IForescast[];

  city: {
    id: number;
    name: string;
    coord: {
      lat: number,
      lon: number
    },
    country: string,
    population: number,
    timezone: number,
    sunrise: number,
    sunset: number
  }
}

export interface IForescast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: IWeather[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ITransformWeatherResponse {
  climateReferenceCity: string;
  country: string;
  coord: {
    lat: number,
    lon: number
  };
  forescast: IForescastDays,
}

export interface IForescastDays {
  [key: string]: {
    [key: string]: {
      tempMax: number;
      tempMin: number;
      feelsLike: number;
      description: string;
      temperatureUnit: string;
    }
  };
}