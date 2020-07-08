/* eslint-disable no-console */
import publicIp from 'public-ip';

export default class WeatherRepository {
  static async location(): Promise<string> {
    const userIp = await publicIp.v4();
    console.log(userIp);
    return userIp;
  }
}