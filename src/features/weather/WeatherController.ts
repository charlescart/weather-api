/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import {
  JsonController, Get, Req, HeaderParam, UseBefore,
} from 'routing-controllers';
import { Request } from 'express';
import requestIp from 'request-ip';
// import Soup from './validators/soupDto';
// import SoupRepository from './SoupRepository';
import WeatherRepository from './WeatherRepository';

@JsonController()
@UseBefore(requestIp.mw())
export default class AuthController {
  @Get('/location')
  location(@Req() req: Request): unknown {
    return WeatherRepository.location(req.clientIp);
  }

  // @Get('/current/:city')
  // getOne(@Param('city') city: string): void {
  //   // return userRepository.findById(id);
  // }
}
