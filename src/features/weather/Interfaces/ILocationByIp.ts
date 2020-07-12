/* eslint-disable eol-last */
/* eslint-disable semi */

import { ITransformWeatherResponse } from './IWeatherApi';

export default interface ILocationByIp {
  city: string;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ILocation {
  clientIp: string;
  infoFromYourIp: ILocationByIp;
  weather: ITransformWeatherResponse;
}