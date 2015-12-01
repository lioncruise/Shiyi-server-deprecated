'use strict';

var server = require('../../../server');
var http = require('http');
var request = require('supertest');
var mm = require('mm');
var should = require('should');


describe('test/controllers/restful/likes.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /likes/:id', function() {
    it('should get like info OK', function(done) {
      request(server)
        .get('/likes/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200, done);
    });

    it('should get status 404', function(done) {
      request(server)
        .get('/likes/10000')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.equal(404);
          res.body.should.have.properties(['statusCode', 'message']);
          done();
        });
    });
  });

  describe('POST /likes', function() {
    it('should create new like to a picture OK', function(done) {
      var like = {
        type: 'LL',
        PictureId: '1'
      };
      request(server)
        .post('/likes')
        .send(like)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.should.have.properties(['type']);
          done();
        });
    });

    it('should create new like to an action OK', function(done) {
      var like = {
        type: 'LL',
        ActionId: '2'
      };
      request(server)
        .post('/likes')
        .send(like)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.should.have.properties(['type']);
          done();
        });
    });

    it('should create new like to a picture with statusCode 404', function(done) {
      var like = {
        type: 'LL',
        PictureId: '10000'
      };
      request(server)
        .post('/likes')
        .send(like)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.equal(404);
          done();
        });
    });
  });

  describe('DELETE /likes/:id', function() {
    it('should delete like OK', function(done) {
      request(server)
        .delete('/likes/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.equal(200);
          done();
        });
    });

    it('should get like 404', function(done) {
      request(server)
        .delete('/likes/11111')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.equal(404);
          res.body.should.have.properties(['statusCode', 'message']);
          done();
        });
    });
  });
});