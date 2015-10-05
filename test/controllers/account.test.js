'use strict';

var server = require('../../server');
var http = require('http');
var request = require('supertest');
var mm = require('mm');
var should = require('should');
var models = require('../../db').models;
var utils = require('../../utils');
var utility = require('utility');

describe('test/controllers/account.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('POST /getSeccode', function() {
    it('should get seccode for register ok', function(done) {
      mm.data(utils, 'sendMessage', null);
      request(server)
        .post('/getSeccode')
        .send({
          phone: '13009865000',
          type: 'register'
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(200);
          res.body.data.should.have.properties(['phone', 'seccode', 'token']);
          done();
        });
    });

    it('should get seccode for changePassword ok', function(done) {
      mm.data(utils, 'sendMessage', null);
      request(server)
        .post('/getSeccode')
        .send({
          phone: '13000000003',
          type: 'changePassword'
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(200);
          res.body.data.should.have.properties(['phone', 'seccode', 'token']);
          done();
        });
    });

    it('should get seccode 409 statusCode for register', function(done) {
      request(server)
        .post('/getSeccode')
        .send({
          phone: '13000000003',
          type: 'register'
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

    it('should get seccode 409 statusCode for changePassword', function(done) {
      request(server)
        .post('/getSeccode')
        .send({
          phone: '13111111111',
          type: 'changePassword'
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

  describe('POST /changePassword', function() {
    it('should changePassword ok', function(done) {
      var phone = '13000000004';
      var password = utility.md5('123123');
      request(server)
        .post('/getSeccode')
        .send({
          phone: phone,
          type: 'changePassword'
        })
        .end(function(err, res) {
          var token = res.body.data.token;
          request(server)
            .post('/changePassword')
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .send({
              phone: phone,
              password: password,
              token: token
            })
            .end(function(err, res) {
              if (err) {
                return done(err);
              }
              res.body.statusCode.should.be.equal(200);
              done();
            });
        });
    });

    it('should changePassword get statusCode 404', function(done) {
      var phone = '13000777004';
      var password = utility.md5('123123');
      var token = utility.md5('eeeee');
      request(server)
        .post('/changePassword')
        .send({
          phone: phone,
          password: password,
          token: token
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(404);
          done();
        });
    });

    it('should changePassword get statusCode 422', function(done) {
      var phone = '13000777004';
      var password = utility.md5('123123');
      request(server)
        .post('/changePassword')
        .send({
          phone: phone,
          password: password,
          token: 'wrong'
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(422);
          done();
        });
    });
  });

  describe('POST /register', function() {
    it('should register ok', function(done) {
      var data = {
        phone: '13009865999',
        password: utility.md5('123456'),
        gender: 'M',
        motto: 'Just do it.'
      };
      request(server)
        .post('/getSeccode')
        .send({
          phone: '13009865999',
          type: 'register'
        })
        .end(function(err, res) {
          var token = res.body.data.token;
          data.token = token;
          request(server)
            .post('/register')
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .send(data)
            .end(function(err, res) {
              if (err) {
                return done(err);
              }
              res.body.statusCode.should.be.equal(200);
              res.body.data.should.have.properties(['phone', 'gender', 'motto', 'id', 'isBlocked']);
              done();
            });
        });
    });

    it('should register get statusCode 409 ok', function(done) {
      var data = {
        phone: '13000000001',
        token: utility.md5('eeeee'),
        gender: 'M',
        motto: 'Just do it.',
        password: utility.md5('123456')
      };
      request(server)
        .post('/register')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .send(data)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(409);
          done();
        });
    });

    it('should register get statusCode 422 ok', function(done) {
      var data = {
        phone: '13000000001',
        token: 'wrong',
        gender: 'M',
        motto: 'Just do it.',
        password: utility.md5('123456')
      };
      request(server)
        .post('/register')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .send(data)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(422);
          done();
        });
    });
  });

  describe('POST /login', function() {
    it('should login ok', function(done) {
      var data = {
        phone: '13000000000',
        password: utility.md5('123456')
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
          res.body.data.should.have.properties(['phone', 'gender', 'motto', 'id', 'isBlocked']);
          done();
        });
    });

    it('should get statusCode 404', function(done) {
      var data = {
        phone: '13333000000',
        password: utility.md5('123456')
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
          res.body.data.should.have.properties(['phone', 'gender', 'motto', 'id', 'isBlocked']);
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