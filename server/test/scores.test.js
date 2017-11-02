const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../server');

const clearScore = require('../helpers/clearScore');
const clearUser = require('../helpers/clearUser');
const addOneDummyUser = require('../helpers/addOneDummyUser');

let validUserId = null;

chai.use(chaiHttp);

const validScore = {
  winner: '59fb128e645e081a78037f99',
  loser: '59fb12b8c8f9931bd977f362',
  winner_score: 120,
  loser_score: 100
};

describe('Score Create-Read-Delete', function () {

  before (() => {
    clearScore();
    addOneDummyUser().then((userId) => {
      validUserId = userId;
    });
  });

  after(() => {
    clearUser();
  });

  describe('POST /scores', function () {

    it('should return inserted score', function (requestFinished) {

      chai
        .request(server)
        .post('/scores')
        .send(validScore)
        .end(function (err, response) {

          response.status.should.equal(201);
          response.body.should.be.an('object');
          response.body.should.have.property('_id');
          response.body.should.have.property('winner');
          response.body.should.have.property('loser');
          response.body.should.have.property('winner_score');
          response.body.should.have.property('loser_score');
          response.body.winner.should.equal(validScore.winner);
          response.body.loser.should.equal(validScore.loser);
          response.body.winner_score.should.equal(validScore.winner_score);
          response.body.loser_score.should.equal(validScore.loser_score);

          validScore._id = response.body._id;

          requestFinished();

        });

    });

    it('should return error 400 if passed an invalid object', function (requestFinished) {

      chai
        .request(server)
        .post('/scores')
        .send({ winner: 'BlahBlahBlah' })
        .end(function (err, response) {

          response.status.should.equal(400);
          response.body.should.be.an('object');

          requestFinished();

        });

    });

  }); // end of POST /scores

  describe('GET /scores', function () {

    it('should return score list', function (requestFinished) {

      chai
        .request(server)
        .get('/scores')
        .end(function (err, response) {

          response.status.should.equal(200);
          response.body.should.be.an('array');

          requestFinished();

        });

    });

  }); // end of GET /scores

  describe('GET /scores/:id', function () {

    it('should return a score', function (requestFinished) {

      chai
        .request(server)
        .get('/scores/' + validScore._id)
        .end(function (err, response) {

          response.status.should.equal(200);
          response.body.should.be.an('object');
          response.body.should.have.property('_id');
          response.body.should.have.property('winner');
          response.body.should.have.property('loser');
          response.body.should.have.property('winner_score');
          response.body.should.have.property('loser_score');
          response.body.winner.should.equal(validScore.winner);
          response.body.loser.should.equal(validScore.loser);
          response.body.winner_score.should.equal(validScore.winner_score);
          response.body.loser_score.should.equal(validScore.loser_score);

          requestFinished();

        });

    });

    it('should return error 404 if given score _id doesn\'t exist', function (requestFinished) {

      chai
        .request(server)
        .get('/scores/59fb12b8c8f9931bd977f362')
        .end(function (err, response) {

          response.status.should.equal(404);
          response.body.should.be.an('object');

          requestFinished();

        });

    });

    it('should return error 404 if given score _id is not a valid mongo.ObjectId', function (requestFinished) {

      chai
        .request(server)
        .get('/scores/blahblahblah')
        .end(function (err, response) {

          response.status.should.equal(404);
          response.body.should.be.an('object');

          requestFinished();

        });

    });

  }); // end of GET /scores/:id

  describe('GET /scores/user/:id', function () {

    it('should return score list of given user _id', function (requestFinished) {

      chai
        .request(server)
        .get('/scores/user/' + validUserId)
        .end(function (err, response) {

          response.status.should.equal(200);
          response.body.should.be.an('array');

          requestFinished();

        });

    });

    it('should return error 404 if given user _id doesn\'t exist', function (requestFinished) {

      chai
        .request(server)
        .get('/scores/user/59fb12b8c8f9931bd977f368')
        .end(function (err, response) {

          response.status.should.equal(404);
          response.body.should.be.an('object');

          requestFinished();

        });

    });

    it('should return error 404 if given user _id is not a valid mongo.ObjectId', function (requestFinished) {

      chai
        .request(server)
        .get('/scores/user/blahblahblah')
        .end(function (err, response) {

          response.status.should.equal(404);
          response.body.should.be.an('object');

          requestFinished();

        });

    });

  }); // end of GET /scores/user/:id

  describe('DELETE /scores/:id', function () {

    it('should return deleted score', function (requestFinished) {

      chai
        .request(server)
        .delete('/scores/' + validScore._id)
        .end(function (err, response) {

          response.status.should.equal(200);
          response.body.should.be.an('object');
          response.body.should.have.property('_id');
          response.body.should.have.property('winner');
          response.body.should.have.property('loser');
          response.body.should.have.property('winner_score');
          response.body.should.have.property('loser_score');
          response.body.winner.should.equal(validScore.winner);
          response.body.loser.should.equal(validScore.loser);
          response.body.winner_score.should.equal(validScore.winner_score);
          response.body.loser_score.should.equal(validScore.loser_score);

          requestFinished();

        });

    });

    it('should return error 404 if given score _id doesn\'t exist', function (requestFinished) {

      chai
        .request(server)
        .delete('/scores/59fb12b8c8f9931bd977f362')
        .end(function (err, response) {

          response.status.should.equal(404);
          response.body.should.be.an('object');

          requestFinished();

        });

    });

    it('should return error 404 if given score _id doesn\'t exist', function (requestFinished) {

      chai
        .request(server)
        .delete('/scores/blahblahblah')
        .end(function (err, response) {

          response.status.should.equal(404);
          response.body.should.be.an('object');

          requestFinished();

        });

    });

  }); // end of DELETE /scores/:id

});
