/* eslint-disable no-console */
// import axios from 'axios';
import WeatherService from './WeatherService';
import ILocationByIp, { ILocation } from './Interfaces/ILocationByIp';

export default class WeatherRepository {
  static async location(clientIp: string): Promise<ILocation> {
    const infoFromYourIp: ILocationByIp = WeatherService.locationByIp(clientIp);
    const weather = await WeatherService.WeatherByCoordinates(infoFromYourIp.coord);
    return { clientIp, infoFromYourIp, weather };
  }
}
