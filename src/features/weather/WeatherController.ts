/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import {
  JsonController, Get, Req,
} from 'routing-controllers';
import { Request } from 'express';
// import Soup from './validators/soupDto';
// import SoupRepository from './SoupRepository';
import WeatherRepository from './WeatherRepository';

@JsonController()
export default class AuthController {
  @Get('/location')
  location(@Req() req: Request): unknown {
    console.log(req.connection.remoteAddress);
    return WeatherRepository.location();
  }

  // @Get('/current/:city')
  // getOne(@Param('city') city: string): void {
  //   // return userRepository.findById(id);
  // }
}
