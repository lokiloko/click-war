const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../server');

const clearUser = require('../helpers/clearUser');
const hashPassword = require('../helpers/hashPassword');
const validateHash = require('../helpers/validateHash');

chai.use(chaiHttp);

const validUser = {
  name: 'Dimitri Wahyudiputra',
  username: 'deathmitri',
  password: 'secret'
};

describe('Authentication', function () {

  before (() => {
    clearUser();
  });

  after (() => {
    clearUser();
  });

  describe('POST /auth/register', function () {

    it('should return registered user', function (requestFinished) {

      chai
        .request(server)
        .post('/auth/register')
        .send(validUser)
        .end(function (err, response) {

          response.status.should.equal(201);
          response.body.should.be.an('object');
          response.body.should.have.property('_id');
          response.body.should.have.property('name');
          response.body.should.have.property('username');
          response.body.should.have.property('password');
          response.body.name.should.equal(validUser.name);
          response.body.username.should.equal(validUser.username);

          const successfulHash = validateHash(validUser.password, response.body.password || '');

          successfulHash.should.equal(true);

          requestFinished();

        });

    });

    it('should return error 400 if passed object username already exist', function (requestFinished) {

      chai
        .request(server)
        .post('/auth/register')
        .send(validUser)
        .end(function (err, response) {

          response.status.should.equal(400);
          response.body.should.be.an('object');
          requestFinished();

        });

    });

    it('should return error 400 if passed object is not valid', function (requestFinished) {

      chai
        .request(server)
        .post('/auth/register')
        .send({ name: 'Alexei' })
        .end(function (err, response) {

          response.status.should.equal(400);
          response.body.should.be.an('object');
          requestFinished();

        });

    });

  }); // end of POST /auth/register

  describe('POST /auth/login', function () {

    it('should return JWT access token', function (requestFinished) {

      chai
        .request(server)
        .post('/auth/login')
        .send({ username: 'deathmitri', password: 'secret' })
        .end(function (err, response) {

          response.status.should.equal(200);
          response.body.should.be.an('object');
          response.body.should.have.property('access_token');
          requestFinished();

        });

    });

    it('should return error 403 if username-password combo is wrong', function (requestFinished) {

      chai
        .request(server)
        .post('/auth/login')
        .send({ username: 'alexei', password: 'wrongpassword' })
        .end(function (err, response) {

          response.status.should.equal(403);
          response.body.should.be.an('object');
          requestFinished();

        });

    });

  });

});
