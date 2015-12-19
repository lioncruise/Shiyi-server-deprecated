'use strict';

const server = require('../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/account.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('POST /verifyPhone', function() {
    it('should verify phone number OK', function(done) {
      request(server)
        .post('/verifyPhone')
        .send({
          phone: '15945990588',
          secCode: '1234',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.status.should.be.equal(true);
          done();
        });
    });

    it('should verify phone number 422', function(done) {
      request(server)
        .post('/verifyPhone')
        .send({
          phone: '15945990589',
          secCode: 123456,
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

    it('should verify phone number 422', function(done) {
      request(server)
        .post('/verifyPhone')
        .send({
          phone: '159459905890',
          secCode: '123456',
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

  describe('POST /register', function() {
    it('should register OK', function(done) {
      request(server)
        .post('/register')
        .send({
          phone: '15945990588',
          nickname: 'Bill',
          password: '12345689',
          gender: 'M',
          motto: '新的一天开始了',
          avatarStoreKey: 'hahaha',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.phone.should.be.equal('15945990588');
          res.body.data.gender.should.be.equal('M');
          res.body.data.motto.should.be.equal('新的一天开始了');
          res.body.data.avatarStoreKey.should.be.equal('hahaha');
          done();
        });
    });

    it('should register 409', function(done) {
      request(server)
        .post('/register')
        .send({
          phone: '15945990587',
          nickname: 'Bill',
          secCode: '1234',
          password: '123456789',
          gender: 'M',
          motto: '新的一天开始了',
          avatarStoreKey: 'hahaha',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(409);
          res.body.message.should.be.equal('手机号未验证');
          done();
        });
    });

    it('should register 409', function(done) {
      request(server)
        .post('/verifyPhone')
        .send({
          phone: '13000000001',
          secCode: '1234',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          request(server)
          .post('/register')
          .send({
            phone: '13000000001',
            nickname: 'Bill',
            secCode: '1234',
            password: '12345689',
            gender: 'M',
            motto: '新的一天开始了',
            avatarStoreKey: 'hahaha',
          })
          .expect('Content-type', 'application/json; charset=utf-8')
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }

            res.body.statusCode.should.be.equal(409);
            res.body.message.should.be.equal('用户已存在');
            done();
          });

        });
    });
  });

  describe('POST /login', function() {

    // 用户登录唯一性验证
    let token;

    it('should login OK', function(done) {
      request(server)
        .post('/login')
        .send({
          phone: '15945990588',
          password: '12345689',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.phone.should.be.equal('15945990588');
          res.body.data.gender.should.be.equal('M');
          res.body.data.motto.should.be.equal('新的一天开始了');
          res.body.data.avatarStoreKey.should.be.equal('hahaha');

          // token 记录，用于之后的验证
          token = res.body.data.token;
          done();
        });
    });

    it('should get returns (with right token)', function(done) {
      request(server)
        .get('/reports?testEnterVerify=true&token=' + token)  // 利用reports接口测试验证
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

    it('should get 401 (other side login)', function(done) {
      request(server)
        .post('/login')
        .send({
          phone: '15945990588',
          password: '12345689',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          request(server)
            .get('/reports?testEnterVerify=true&token=' + token)  // 利用reports接口测试验证
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end(function(err, res) {
              if (err) {
                return done(err);
              }

              res.body.statusCode.should.be.equal(401);
              done();
            });
        });
    });

    it('should login 404', function(done) {
      request(server)
        .post('/login')
        .send({
          phone: '15945990588',
          password: '1234568',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(404);
          res.body.message.should.be.equal('用户名或密码错误');
          done();
        });
    });

    it('should login 422', function(done) {
      request(server)
        .post('/login')
        .send({
          phone: '159459905880',
          password: '1234568',
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

  describe('PUT /update', function() {
    it('should update OK', function(done) {
      request(server)
        .put('/update')
        .send({
          nickname: 'Jack',
          password: '123456789',
          gender: 'F',
          motto: '明天好运',
          avatarStoreKey: 'xixixi',
          getuiCid: '06fe917679a82622368d08af6f8f21d5',
        })
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

    it('should update 422', function(done) {
      request(server)
        .put('/update')
        .send({
          nickname: 'Jack',
          password: '',
          gender: 'F',
          motto: '',
          avatarStoreKey: 'xixixi',
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

    it('should update 422', function(done) {
      request(server)
        .put('/update')
        .send({
          nickname: 'Jackkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
          password: '',
          gender: 'F',
          motto: '',
          avatarStoreKey: 'xixixi',
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
