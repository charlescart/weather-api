import app from '../../../server';
import request from 'supertest'

const toMatch = {
  infoFromYourIp: {
    coord: {
      lat: expect.any(Number),
      lon: expect.any(Number),
    },
  },
  weather: {
    coord: {
      lat: expect.any(Number),
      lon: expect.any(Number),
    },
    forescast: expect.any(Object),
  },
};

describe('WeatherController', () => {
  describe('EndPoints Location, Current and Forecast', () => {
    it('GET /v1/location with IP from San Francisco/US', async (done) => {

      return request(app).get('/v1/location')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-Client-IP', '162.243.152.177')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchSnapshot(toMatch);
          done();
        });
    }, 30000);

    it('GET /v1/location with IP invalid ::1 in localhost', async (done) => {

      return request(app).get('/v1/location')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-Client-IP', '::1')
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchSnapshot();
          done();
        });
    }, 30000);

    it('GET /v1/current without city name and with IP from Hurlingham/Argentina', async (done) => {

      return request(app).get('/v1/current')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-Client-IP', '186.122.141.220')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchSnapshot({
            coord: expect.any(Object),
            temp: expect.any(Number),
            tempMax: expect.any(Number),
            tempMin: expect.any(Number),
            feelsLike: expect.any(Number),
            description: expect.any(String),
          });

          done();
        });
    }, 30000);

    it('GET /v1/current without city name and with IP from Bengaluru/India', async (done) => {

      return request(app).get('/v1/current')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-Client-IP', '142.93.217.248')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchSnapshot({
            coord: expect.any(Object),
            temp: expect.any(Number),
            tempMax: expect.any(Number),
            tempMin: expect.any(Number),
            feelsLike: expect.any(Number),
            description: expect.any(String),
          });

          done();
        });
    }, 30000);

    it('GET /v1/current/caracas with city name Caracas/Venezuela :D :D :D', async (done) => {

      return request(app).get('/v1/current/caracas')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-Client-IP', '186.122.141.220')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchSnapshot({
            coord: expect.any(Object),
            temp: expect.any(Number),
            tempMax: expect.any(Number),
            tempMin: expect.any(Number),
            feelsLike: expect.any(Number),
            description: expect.any(String),
          });

          done();
        });
    }, 30000);

    it('GET /v1/current/127barcelona52es7329437 with city name impossible', async (done) => {

      return request(app).get('/v1/current/127barcelona52es7329437')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-Client-IP', '186.122.141.220')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchSnapshot({
            coord: expect.any(Object),
            temp: expect.any(Number),
            tempMax: expect.any(Number),
            tempMin: expect.any(Number),
            feelsLike: expect.any(Number),
            description: expect.any(String),
          });

          done();
        });
    }, 30000);

    it('GET /v1/current/h with city name very short', async (done) => {

      return request(app).get('/v1/current/h')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-Client-IP', '186.122.141.220')
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchSnapshot();

          done();
        });
    }, 30000);

    it('GET /v1/forecast without city name and with IP from Toronto/Canada', async (done) => {

      return request(app).get('/v1/forecast')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-Client-IP', '142.93.148.182')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchSnapshot({
            coord: {
              lat: expect.any(Number),
              lon: expect.any(Number),
            },
            forescast: expect.any(Object)
          });

          done();
        });
    }, 30000);

    it('GET /v1/forecast/japan with city name Japan/Japan', async (done) => {

      return request(app).get('/v1/forecast/japan')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-Client-IP', '186.122.141.220')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchSnapshot({
            coord: {
              lat: expect.any(Number),
              lon: expect.any(Number),
            },
            forescast: expect.any(Object)
          });

          done();
        });
    }, 30000);

    it('GET /v1/forecast/&1$7japan?*,jp with city name impossible', async (done) => {

      return request(app).get('/v1/forecast/&1$7japan?*,jp')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-Client-IP', '186.122.141.220')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchSnapshot({
            coord: {
              lat: expect.any(Number),
              lon: expect.any(Number),
            },
            forescast: expect.any(Object)
          });

          done();
        });
    }, 30000);

    it('GET /v1/forecast/ol with city name very short', async (done) => {

      return request(app).get('/v1/forecast/ol')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('X-Client-IP', '186.122.141.220')
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchSnapshot();

          done();
        });
    }, 30000);
  });
});