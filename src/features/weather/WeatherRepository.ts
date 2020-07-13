/* eslint-disable no-param-reassign */

import WeatherService from './WeatherService';
import ILocationByIp, { ILocation } from './Interfaces/ILocationByIp';
import { CleaningCityName } from '../../helpers/StringsHelper';
import { City, Search, WeatherApi } from './WeatherTypes';

export default class WeatherRepository {
  static async location(clientIp: string): Promise<ILocation> {
    const infoFromYourIp: ILocationByIp = WeatherService.locationByIp(clientIp);
    const weather = await WeatherService.WeatherByCoordinatesOrCity(infoFromYourIp.coord);

    return { clientIp, infoFromYourIp, weather };
  }

  static async current(city: City, clientIp: string): Promise<WeatherApi> {
    let search = {} as Search;
    search = !city ? WeatherService.locationByIp(clientIp).coord : { q: CleaningCityName(city) };

    return WeatherService.WeatherByCoordinatesOrCity(search, 'weather');
  }

  static async forecast(city: City, clientIp: string): Promise<WeatherApi> {
    let search = {} as Search;
    search = !city ? WeatherService.locationByIp(clientIp).coord : { q: CleaningCityName(city) };

    return WeatherService.WeatherByCoordinatesOrCity(search);
  }
}
