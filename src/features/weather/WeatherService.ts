/* eslint-disable import/prefer-default-export */
import { BadRequestError, HttpError } from 'routing-controllers';
import { lookup, Lookup } from 'geoip-lite';
import axios, { AxiosResponse } from 'axios';
import moment, { Moment } from 'moment';
import IParams from './Interfaces/IParams';
import IWeatherApi, { IForescast, IForescastDays, ITransformWeatherResponse } from './Interfaces/IWeatherApi';
import ILocationByIp from './Interfaces/ILocationByIp';

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
  * Params: ll: number[].
  * Description: obtiene informacion del clima a traves de coordenadas.
  */
  static WeatherByCoordinates(coord: { lat: number; lon: number }): Promise<ITransformWeatherResponse> {
    const params: IParams = {
      ...coord,
      mode: 'json',
      lang: 'es',
      units: 'metric',
      appid: process.env.WEATHER_API_KEY || 'KEY_NOT_FOUND',
    };

    return axios
      .get('https://api.openweathermap.org/data/2.5/forecast', { params })
      .then((res: AxiosResponse) => WeatherService.transformWeatherResponse(res.data as IWeatherApi))
      .catch((e: any) => {
        const { response: { data } } = e;
        throw new HttpError(data.cod, data.message);
      });
  }

  /* Function: transformWeatherResponse
  * Params: weatherApi: IWeatherApi.
  * Description: Transforma respuesta de Api Open Weather.
  */
  static transformWeatherResponse(weatherApi: IWeatherApi): ITransformWeatherResponse {
    const { city: { name: climateReferenceCity, coord, country }, list } = weatherApi;
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
      climateReferenceCity, country, coord, forescast,
    };
  }

  static transformLocationByIp(locationByIp: Lookup): ILocationByIp {
    const { city, country, ll } = locationByIp;
    return { city, country, coord: { lat: ll[0], lon: ll[1] } };
  }
}
