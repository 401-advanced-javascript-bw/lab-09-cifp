'use strict';

const rootDir = process.cwd();
const movies = require(`${rootDir}/src/models/movies/movies-model.js`);

const supergoose = require('../supergoose.js');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Movies Model', () => {
  it('can post() a new movie', () => {
    let obj = {
      title: 'forrest gump',
      genre: 'drama/comedy drama',
      rating: 8.8
    };
    return movies.post(obj).then(record => {
      Object.keys(obj).forEach(key => {
        expect(record[key]).toEqual(obj[key]);
      });
    });
  });

  it('can get() a movie', () => {
    let obj = {
      title: 'forrest gump',
      genre: 'drama/comedy drama',
      rating: 8.8
    };
    return movies.post(obj).then(record => {
      return movies.get(record._id).then(movie => {
        Object.keys(obj).forEach(key => {
          expect(movie[0][key]).toEqual(obj[key]);
        });
      });
    });
  });
});
