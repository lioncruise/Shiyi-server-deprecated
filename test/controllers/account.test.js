'use strict';

var server = require('../../server');
var http = require('http');
var request = require('supertest');
var mm = require('mm');
var should = require('should');
var models = require('../../db').models;
var utils = require('../../utils');

describe('test/controllers/account.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('POST /getSeccode', function() {
    it('should get seccode ok', function(done) {
      mm.data(utils, 'sendMessage', null);
      request(server)
        .post('/getSeccode')
        .send({
          phone: '13009865000'
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(200);
          res.body.should.have.properties(['phone', 'seccode']);
          done();
        });
    });

    it('should get 409 statusCode', function(done) {
      mm.data(models.User, 'find', {
        id: 1,
        phone: '13009865000'
      });
      request(server)
        .post('/getSeccode')
        .send({
          phone: '13009865000'
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(409);
          res.body.should.have.properties(['statusCode', 'message']);
          done();
        });
    });
  });

  describe('POST /register', function() {
    it('should register ok', function(done) {
      var data = {
        phone: '13000000001',
        password: '123456',
        gender: 'M',
        motto: 'Just do it.'
      };
      request(server)
        .post('/register')
        .send(data)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(200);
          res.body.should.have.properties(['phone', 'gender', 'motto', 'id', 'isBlocked']);
          done();
        });
    });

    it('should get statusCode 409', function(done) {
      var data = {
        phone: '13000000000',
        password: '123456',
        gender: 'M',
        motto: 'Just do it.'
      };
      request(server)
        .post('/register')
        .send(data)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(409);
          res.body.should.have.properties(['statusCode', 'message']);
          done();
        });
    });
  });

  describe('POST /login', function() {
    it('should login ok', function(done) {
      var data = {
        phone: '13000000000',
        password: '123456'
      };
      request(server)
        .post('/login')
        .send(data)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(200);
          res.body.should.have.properties(['phone', 'gender', 'motto', 'id', 'isBlocked']);
          done();
        });
    });

    it('should get statusCode 404', function(done) {
      var data = {
        phone: '13333000000',
        password: '123456'
      };
      request(server)
        .post('/login')
        .send(data)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(404);
          res.body.should.have.properties(['statusCode', 'message']);
          done();
        });
    });
  });

  describe('POST /logout', function() {
    it('should logout ok', function(done) {
      request(server)
        .get('/logout')
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

  describe('PUT /update', function() {
    it('should update user info ok', function(done) {
      var data = {
        nickname: 'user one',
        birthday: '1993-01-01',
        hometown: '黑龙江 哈尔滨',
        motto: 'Do now!',
        gender: 'F'
      };
      request(server)
        .put('/update')
        .send(data)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(200);
          res.body.should.have.properties(['phone', 'gender', 'motto', 'id', 'isBlocked']);
          done();
        });
    });

    it('should update user info2 ok', function(done) {
      request(server)
        .put('/update')
        .send({})
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