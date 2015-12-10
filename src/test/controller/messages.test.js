'use strict';

const server = require('../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/messages.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /getAllUnreadMessages', function() {
    it('should get all unread message and delete them OK', function(done) {
      request(server)
        .get('/getAllUnreadMessages')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data[0].TargetUserId.should.be.equal(1);
          res.body.data[0].User.id.should.be.a.Number();
          done();
        });
    });
  });

  describe('GET /getAllMessages', function() {
    it('should get all message and delete them OK', function(done) {
      request(server)
        .get('/getAllMessages')
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

    it('should get all message with user info and delete them OK', function(done) {
      request(server)
        .get('/getAllMessages?isWithUsersInfo=true')
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
  });
});
