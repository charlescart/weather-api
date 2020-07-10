/* eslint-disable no-console */
import { Lookup } from 'geoip-lite';
import WeatherService from './WeatherService';
// import { GetGeoForIp } from './WeatherTypes';

export default class WeatherRepository {
  static location(clientIp: string): unknown {
    const locationByIp: Lookup = WeatherService.locationByIp(clientIp);
    return { clientIp, locationByIp };
  }
}
