'use strict';

const server = require('../../../server');
const http = require('http2');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/restful/messages.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('POST /messages', function() {
    it('should create new message OK', function(done) {
      const message = {
        content: '嗨，美女',
        TargetUserId: '2',
      };

      request(server)
        .post('/messages')
        .send(message)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.type.should.be.equal('message');
          res.body.data.content.should.be.equal('嗨，美女');
          res.body.data.UserId.should.be.equal(1);
          res.body.data.TargetUserId.should.be.equal('2');
          done();
        });
    });

    it('should create new message 422', function(done) {
      const message = {
        TargetUserId: '2',
      };

      request(server)
        .post('/messages')
        .send(message)
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

    it('should create new message 422', function(done) {
      const message = {
        content: 'hello',
      };

      request(server)
        .post('/messages')
        .send(message)
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

  describe('GET /messages/:id', function() {
    it('should get message info OK', function(done) {
      request(server)
        .get('/messages/3')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(3);
          done();
        });
    });

    it('should get message info 404', function(done) {
      request(server)
        .get('/messages/10000')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(404);
          res.body.message.should.be.equal('消息不存在');
          done();
        });
    });

    it('should get message info with user info OK', function(done) {
      request(server)
        .get('/messages/3?isWithUsersInfo=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(3);
          res.body.data.User.id.should.be.a.Number();
          res.body.data.TargetUser.id.should.be.a.Number();
          done();
        });
    });
  });
});
