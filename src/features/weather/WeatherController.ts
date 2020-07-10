/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import {
  JsonController, Get, UseBefore, QueryParams,
} from 'routing-controllers';
import WeatherRepository from './WeatherRepository';
import ILocationParams from './validator/ILocationParams';
import RequestIp from '../../middlewares/RequestIp';

@JsonController()
@UseBefore(RequestIp)
export default class WeatherController {
  @Get('/location')
  location(@QueryParams() params: ILocationParams): unknown {
    return WeatherRepository.location(params.clientIp);
  }

  // @Get('/current/:city')
  // getOne(@Param('city') city: string): void {
  //   // return userRepository.findById(id);
  // }
}
