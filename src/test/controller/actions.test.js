'use strict';

const server = require('../../server');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/restful/albums.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /getActions', function() {
    it('should get own action info OK', function(done) {
      request(server)
        .get('/getActions')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should get own action info with offset and limit OK', function(done) {
      request(server)
        .get('/getActions?offset=0&limit=10')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          done();
        });
    });

    let createdTimeStamp;
    it('should get own action info with lastActionId OK', function(done) {
      request(server)
        .get('/getActions?lastActionId=1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          // todo Change createAt and test the returns
          res.body.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should get own action info with lastActionCreatedTimestamp OK', function(done) {
      request(server)
        .get('/getActions?lastActionCreatedTimestamp=' + createdTimeStamp)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          // todo Change createAt and test the returns
          res.body.statusCode.should.be.equal(200);
          done();
        });
    });
  });
});
