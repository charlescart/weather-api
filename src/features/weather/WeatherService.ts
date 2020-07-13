/* eslint-disable import/prefer-default-export */
import { BadRequestError, HttpError } from 'routing-controllers';
import { lookup, Lookup } from 'geoip-lite';
import axios, { AxiosResponse } from 'axios';
import moment, { Moment } from 'moment';
import IParams from './Interfaces/IParams';
import {
  IForescast, IForescastDays, IWeatherForecastResponse, IWeatherForecast, IWeatherCurrent,
  IWeatherCurrentResponse,
} from './Interfaces/IWeatherApi';
import ILocationByIp from './Interfaces/ILocationByIp';
import { Search, WeatherApi, Type } from './WeatherTypes';

export default class WeatherService {
  /* Function: locationByIp
  * Params: clientIp: string
  * Description: obtiene informacion geografica a traves de una Ip.
  */
  static locationByIp(clientIp: string): ILocationByIp {
    const locationByIp = lookup(clientIp);
    if (!locationByIp) throw new BadRequestError('Ubicación a traves de Ip no determinada');
    return WeatherService.transformLocationByIp(locationByIp);
  }

  /* Function: WeatherByCoordinates
  * Params: search: Search, type: Type = 'forecast'
  * Description: obtiene informacion del clima a traves de coordenadas.
  */
  static WeatherByCoordinatesOrCity(search: Search, type: Type = 'forecast'): Promise<WeatherApi> {
    const params: IParams = {
      ...search,
      mode: 'json',
      lang: 'es',
      units: 'metric',
      appid: process.env.WEATHER_API_KEY || 'KEY_NOT_FOUND',
    };

    return axios
      .get(`https://api.openweathermap.org/data/2.5/${type}`, { params })
      .then((res: AxiosResponse) => (type === 'forecast'
        ? WeatherService.transformWeatherForecast(res.data as IWeatherForecast)
        : WeatherService.transformWeatherCurrent(res.data as IWeatherCurrent)))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((e: any) => {
        const { response: { data } } = e;
        throw new HttpError(data.cod, data.message);
      });
  }

  /* Function: transformWeatherForecast
  * Params: weatherApi: IWeatherForecast.
  * Description: Transforma respuesta de Api Open Weather on forecast.
  */
  static transformWeatherForecast(weatherApi: IWeatherForecast): IWeatherForecastResponse {
    const { city: { name: climateReferenceZone, coord, country }, list } = weatherApi;
    const forescast = {} as IForescastDays;

    list.forEach((item: IForescast) => {
      const date: Moment = moment(item.dt_txt);

      if (!forescast[date.format('YYYY-MM-DD')]) forescast[date.format('YYYY-MM-DD')] = {};

      const { main: { feels_like: feelsLike, temp_max: tempMax, temp_min: tempMin }, weather } = item;
      const { description } = weather[0];

      forescast[date.format('YYYY-MM-DD')][date.format('HH:mm:ss')] = {
        tempMax, tempMin, feelsLike, description, temperatureUnit: 'Celsius',
      };
    });

    return {
      climateReferenceZone, country, coord, forescast,
    };
  }

  /* Function: transformLocationByIp
  * Params: locationByIp: Lookup.
  * Description: Transforma respuesta de Api Geo Ip.
  * */
  static transformLocationByIp(locationByIp: Lookup): ILocationByIp {
    const { city, country, ll } = locationByIp;
    return { city, country, coord: { lat: ll[0], lon: ll[1] } };
  }

  /* Function: transformWeatherCurrent
  * Params: weatherApi: IWeatherCurrent.
  * Description: Transforma respuesta de Api Open Weather on weather.
  * */
  static transformWeatherCurrent(weatherApi: IWeatherCurrent): IWeatherCurrentResponse {
    const {
      name: city,
      sys: { country },
      main: {
        temp, feels_like: feelsLike, temp_max: tempMax, temp_min: tempMin,
      },
      weather,
      coord,
    } = weatherApi;

    return {
      city, country, coord, temp, tempMax, tempMin, feelsLike, description: weather[0].description,
    };
  }
}
