'use strict';

var server = require('../../../server');
var http = require('http');
var request = require('supertest');
var mm = require('mm');
var should = require('should');


describe('test/controllers/restful/comments.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /comments/:id', function() {
    it('should get comment info OK', function(done) {
      request(server)
        .get('/comments/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200, done);
    });

    it('should get comment 404', function(done) {
      request(server)
        .get('/comments/10000')
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

  describe('POST /comments', function() {
    var comment = {
      content: '这是一条评论',
      PictureId: '3'
    };

    it('should create new comment OK', function(done) {
      request(server)
        .post('/comments')
        .send(comment)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.have.properties(['content']);
          done();
        });
    });
  });

  describe('DELETE /comments/:id', function() {
    it('should delete comment OK', function(done) {
      request(server)
        .delete('/comments/1')
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

    it('should get comments 404', function(done) {
      request(server)
        .delete('/comments/11111')
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