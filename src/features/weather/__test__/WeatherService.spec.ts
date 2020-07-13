import WeatherService from '../WeatherService';
import { BadRequestError } from 'routing-controllers';

describe('WeatherService', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('Function locationByIp() with IP invalid', () => {
    expect(() => {
      WeatherService.locationByIp('::1');
    }).toThrow();
  });

  it('Function WeatherByCoordinatesOrCity() without key of Api', async (done) => {
    process.env.WEATHER_API_KEY = undefined;
    WeatherService.WeatherByCoordinatesOrCity({ q: 'toronto' })
      .catch((e) => {
        expect(e.message).toContain('Invalid API key');
        done();
      });
  }, 30000);

});