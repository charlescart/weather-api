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
  location(@Req() req: Request, @HeaderParam('x-forwarded-for') ipA: string): unknown {
    console.log(req.connection.remoteAddress);
    console.log(`x-forwarded-for: ${ipA}`);
    console.log(`ip: ${req.ip}`);
    console.log(`ips: ${req.ips}`);
    console.log(`ip library: ${req.clientIp}`);
    const userIp: string | undefined = req.connection.remoteAddress;
    return WeatherRepository.location(userIp);
  }

  // @Get('/current/:city')
  // getOne(@Param('city') city: string): void {
  //   // return userRepository.findById(id);
  // }
}
