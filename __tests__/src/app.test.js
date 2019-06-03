'use strict';

const rootDir = process.cwd();
const supergoose = require('./supergoose.js');
const { app } = require(`${rootDir}/src/app.js`);
const mockRequest = supergoose.server(app);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('api server', () => {
  it('should respond with a 404 on an invalid route', () => {
    return mockRequest.get('/foo').then(results => {
      expect(results.status).toBe(404);
    });
  });

  it('should respond with a 404 on an invalid method', () => {
    return mockRequest.post('/api/v1/movies/12').then(results => {
      expect(results.status).toBe(404);
    });
  });

  it('should be able to post to a valid model', () => {
    let obj = {
      title: 'forrest gump',
      genre: 'drama/comedy drama',
      rating: 8.8
    };

    return mockRequest
      .post('/api/v1/movies')
      .send(obj)
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.title).toEqual(obj.title);
      });
  });

  it('following a post to a valid model, should find a single record', () => {
    let obj = {
      title: 'forrest gump',
      genre: 'drama/comedy drama',
      rating: 8.8
    };

    return mockRequest
      .post('/api/v1/movies')
      .send(obj)
      .then(results => {
        return mockRequest
          .get(`/api/v1/movies/${results.body._id}`)
          .then(list => {
            expect(list.status).toBe(200);
            expect(list.body.title).toEqual(obj.title);
          });
      });
  });
});
