import app from '../../../server';
import request from 'supertest'

describe('HomeController', () => {
  describe('routes', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...OLD_ENV };
    });

    afterAll(() => {
      process.env = OLD_ENV;
    });

    it('GET /v1', done => {

      request(app).get('/v1')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.message).toMatch(/running/);
          done();
        });
    });

    it('GET /v1 in port 3000', done => {
      // jest.resetModules();
      process.env.PORT = undefined;

      request(app).get('/v1')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.message).toMatch(/running/);
          done();
        });
    });
  });
});