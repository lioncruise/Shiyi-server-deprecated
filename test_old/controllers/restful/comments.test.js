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
    it('should create new comment to a picture OK', function(done) {
      var comment = {
        content: '这是一条评论',
        PictureId: '3'
      };
      request(server)
        .post('/comments')
        .send(comment)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.should.have.properties(['content']);
          done();
        });
    });

    it('should create new comment to an action OK', function(done) {
      var comment = {
        content: '这是一条评论',
        ActionId: '5'
      };
      request(server)
        .post('/comments')
        .send(comment)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.should.have.properties(['content']);
          done();
        });
    });

    it('should create new comment to a comment OK', function(done) {
      var comment = {
        content: '这是一条评论',
        OrignalCommentId: '4'
      };
      request(server)
        .post('/comments')
        .send(comment)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.should.have.properties(['content']);
          done();
        });
    });

    it('should create new comment to a comment with statusCode 404', function(done) {
      var comment = {
        content: '这是一条评论',
        OrignalCommentId: '4000'
      };
      request(server)
        .post('/comments')
        .send(comment)
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