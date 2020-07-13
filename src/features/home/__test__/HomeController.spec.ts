import app from '../../../server';
import request from 'supertest'

describe('HomeController', () => {
  describe('routes', () => {
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
  });
});