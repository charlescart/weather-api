/* eslint-disable import/prefer-default-export */
import { BadRequestError } from 'routing-controllers';
import { lookup, Lookup } from 'geoip-lite';
import { GetGeoForIp } from './WeatherTypes';

export default class WeatherService {
  static locationByIp(clientIp: string): Lookup {
    const locationByIp: GetGeoForIp = lookup(clientIp);
    if (!locationByIp) throw new BadRequestError('Ubicación a traves de Ip no determinada');
    return locationByIp;
  }
}
