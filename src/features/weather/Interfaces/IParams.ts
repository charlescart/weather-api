/* eslint-disable eol-last */
/* eslint-disable semi */

export default interface IParams {
  mode: 'json' | 'xml';
  lang?: 'es' | 'en';
  units?: 'metric' | 'imperial';
  lat: number;
  lon: number;
  appid: string;
}