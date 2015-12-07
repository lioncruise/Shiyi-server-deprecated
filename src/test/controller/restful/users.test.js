'use strict';

const server = require('../../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/restful/users.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /users/:id', function() {
    it('should get user info OK', function(done) {
      request(server)
        .get('/users/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(1);
          res.body.data.should.have.properties(['avatarDownloadUrl', 'phone', 'nickname', 'avatarStoreKey']);
          done();
        });
    });

    it('should get user info 404', function(done) {
      request(server)
        .get('/users/10000')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(404);
          res.body.message.should.be.equal('用户不存在');
          done();
        });
    });

    it('should get user with albums OK', function(done) {
      request(server)
        .get('/users/1?isWithAlbums=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(1);
          res.body.data.should.have.properties(['avatarDownloadUrl', 'phone', 'nickname', 'avatarStoreKey', 'ownAlbums']);
          res.body.data.ownAlbums[0].id.should.be.a.Number();
          res.body.data.ownAlbums[0].UserId.should.be.equal(1);
          done();
        });
    });

    it('should get user with actions OK', function(done) {
      request(server)
        .get('/users/1?isWithActions=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(1);
          res.body.data.should.have.properties(['avatarDownloadUrl', 'phone', 'nickname', 'avatarStoreKey', 'Actions']);
          res.body.data.Actions[0].Memory.id.should.be.a.Number();
          done();
        });
    });

    it('should get user and actions with limit an offset OK', function(done) {
      request(server)
        .get('/users/1?isWithActions=true&offset=0&limit=10')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(1);
          res.body.data.should.have.properties(['avatarDownloadUrl', 'phone', 'nickname', 'avatarStoreKey', 'Actions']);
          res.body.data.Actions[0].Memory.id.should.be.a.Number();
          done();
        });
    });
  });
});
