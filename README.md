# ![CF](http://i.imgur.com/7v5ASc8.png) LAB

## lab-15-api-server

### Author:Bonnie Wang

### Links and Resources

- [submission PR](http://xyz.com)
- [travis](https://www.travis-ci.com/401-advanced-javascript-bw/lab-09-cifp)
- [heroku](https://lab-09-cifp.herokuapp.com/)

### Models

#### `movies-model.js`

#### `mongo-model.js`

### Schemas

#### `movies-schema.js`

#### `middleware.js`

##### authenticate user/token

#### `router.js -> router`

#### `router2.js -> router for user capabilities`

#### `users-model.js -> generate key/token, compare passwords`

#### `google.js -> google OAuth`

### Setup

#### `.env` requirements

- `PORT 8080` - Port Number
- `MONGODB_URI://localhost:27017/lab-08'` - URL to the running mongo instance/db

#### Running the app

- `npm i`
- `npm start`
- Endpoint: `/singin/`
  - sings in user.
- Endpoint: `/oauth/`
  - verify user
- Endpoint: `/movies`
  - get, post, put, delete depending on role

#### Tests

- `npm test`
- can GET, POST, PUT, and DELETE categories and products.
