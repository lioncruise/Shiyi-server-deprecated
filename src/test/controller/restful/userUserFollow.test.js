'use strict';

const server = require('../../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/restful/userUserFollow.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('POST /userUserFollows', function() {
    it('should create user user follow OK', function(done) {
      request(server)
        .post('/userUserFollows')
        .send({
          TargetUserId: '11',
          UserId: '1',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.TargetUserId.should.be.equal('11');
          res.body.data.UserId.should.be.equal('1');
          done();
        });
    });

    it('should create user user follow 422', function(done) {
      request(server)
        .post('/userUserFollows')
        .send({
          TargetUserId: 12,
          UserId: '1',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(422);
          res.body.message.should.be.equal('Validation Failed');
          done();
        });
    });
  });
});
