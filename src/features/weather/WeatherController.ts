/* eslint-disable class-methods-use-this */

import {
  JsonController, Get, UseBefore, Params,
} from 'routing-controllers';
import WeatherRepository from './WeatherRepository';
import ILocationParams from './validator/ILocationParams';
import RequestIp from '../../middlewares/RequestIp';
import { ILocation } from './Interfaces/ILocationByIp';
import { WeatherApi } from './WeatherTypes';

@JsonController()
@UseBefore(RequestIp)
export default class WeatherController {
  @Get('/location')
  location(@Params() { clientIp }: ILocationParams): Promise<ILocation> {
    return WeatherRepository.location(clientIp);
  }

  @Get('/current/:city?')
  current(@Params() { city, clientIp }: ILocationParams): Promise<WeatherApi> {
    return WeatherRepository.current(city, clientIp);
  }

  @Get('/forecast/:city?')
  forescast(@Params() { city, clientIp }: ILocationParams): Promise<WeatherApi> {
    return WeatherRepository.forecast(city, clientIp);
  }
}
