'use strict';

const server = require('../../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/restful/albums.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /comments/:id', function() {
    it('should get comment info OK', function(done) {
      request(server)
        .get('/comments/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(200);
          res.body.data.id.should.be.equal(1);
          done();
        });
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
          res.body.message.should.be.equal('评论不存在');
          done();
        });
    });

    it('should get comment info with user OK', function(done) {
      request(server)
        .get('/comments/2?isWithUser=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(200);
          res.body.data.OrignalCommentId.should.be.a.Number();
          res.body.data.User.id.should.be.a.Number();
          done();
        });
    });

    it('should get comment info with original comment OK', function(done) {
      request(server)
        .get('/comments/2?isWithOrignalComment=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(200);
          res.body.data.OrignalCommentId.should.be.a.Number();
          res.body.data.OrignalComment.id.should.be.a.Number();
          done();
        });
    });

    it('should get comment info with user and original comment OK', function(done) {
      request(server)
        .get('/comments/2?isWithOrignalComment=true&isWithUser=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(200);
          res.body.data.OrignalCommentId.should.be.a.Number();
          res.body.data.OrignalComment.id.should.be.a.Number();
          res.body.data.OrignalComment.User.id.should.be.a.Number();
          done();
        });
    });
  });

  describe('POST /comments', function() {
    it('should create new comment to a memory OK', function(done) {
      const comment = {
        content: '这是一条评论',
        MemoryId: '1',
        AlbumId: '1',
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

          res.body.statusCode.should.be.equal(200);
          res.body.data.UserId.should.be.equal(1);
          res.body.data.MemoryId.should.be.equal('1');
          res.body.data.AlbumId.should.be.equal('1');
          done();
        });
    });

    it('should create new comment to a comment OK', function(done) {
      const comment = {
        content: '这是一条评论',
        MemoryId: '1',
        AlbumId: '1',
        OrignalCommentId: '1',
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

          res.body.statusCode.should.be.equal(200);
          res.body.data.UserId.should.be.equal(1);
          res.body.data.MemoryId.should.be.equal('1');
          res.body.data.AlbumId.should.be.equal('1');
          res.body.data.OrignalCommentId.should.be.equal('1');
          done();
        });
    });

    it('should create new comment to a memory OK', function(done) {
      const comment = {
        content: '这是一条评论',
        MemoryId: '1',
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

          res.body.statusCode.should.be.equal(422);
          res.body.message.should.be.equal('Validation Failed');
          done();
        });
    });

    it('should create new comment to a memory OK', function(done) {
      const comment = {
        content: '这是一条评论',
        MemoryId: 1,
        AlbumId: '1',
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

          res.body.statusCode.should.be.equal(422);
          res.body.message.should.be.equal('Validation Failed');
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

    it('should delete comment 404', function(done) {
      request(server)
        .delete('/comments/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(404);
          res.body.message.should.equal('删除失败');
          done();
        });
    });

    it('should delete comment 404', function(done) {
      request(server)
        .delete('/comments/2')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(404);
          res.body.message.should.equal('删除失败');
          done();
        });
    });

    it('should delete comment 404', function(done) {
      request(server)
        .delete('/comments/10000')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(404);
          res.body.message.should.equal('删除失败');
          done();
        });
    });
  });
});

