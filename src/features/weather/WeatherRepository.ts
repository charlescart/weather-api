/* eslint-disable no-console */
import publicIp from 'public-ip';

export default class WeatherRepository {
  static async location(userIp: string | undefined): any {
    const serverIp = await publicIp.v4();
    console.log(`Ip server: ${userIp}`);
    return { userIp, serverIp };
  }
}