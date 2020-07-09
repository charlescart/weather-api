/* eslint-disable no-console */
import { lookup } from 'geoip-lite';

export default class WeatherRepository {
  static async location(clientIp: string): any {
    return { clientIp, geo: lookup(clientIp) };
  }
}