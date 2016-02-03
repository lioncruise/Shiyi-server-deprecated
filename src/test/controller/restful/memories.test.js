'use strict';

const server = require('../../../server');
const http = require('http2');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/restful/memories.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /memories/: id', function() {
    it('should get memory info OK', function(done) {
      request(server)
        .get('/memories/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(1);
          res.body.data.UserId.should.be.a.Number();
          res.body.data.AlbumId.should.be.a.Number();
          done();
        });
    });

    it('should get memory info 404', function(done) {
      request(server)
        .get('/memories/10000')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(404);
          res.body.message.should.be.equal('记忆不存在');
          done();
        });
    });

    it('should get memory info with pictures OK', function(done) {
      request(server)
        .get('/memories/1?isWithPictures=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(1);
          res.body.data.UserId.should.be.a.Number();
          res.body.data.AlbumId.should.be.a.Number();
          res.body.data.should.have.property('Pictures');
          done();
        });
    });

    it('should get memory info with comments OK', function(done) {
      request(server)
        .get('/memories/4?isWithComments=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(4);
          res.body.data.UserId.should.be.a.Number();
          res.body.data.AlbumId.should.be.a.Number();
          res.body.data.should.have.property('Comments');
          res.body.data.Comments[0].User.id.should.be.a.Number();
          done();
        });
    });

    it('should get memory info with likes OK', function(done) {
      request(server)
        .get('/memories/4?isWithLikes=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(4);
          res.body.data.UserId.should.be.a.Number();
          res.body.data.AlbumId.should.be.a.Number();
          res.body.data.should.have.property('Likes');
          res.body.data.Likes[0].User.id.should.be.a.Number();
          done();
        });
    });
  });

  describe('POST /memories', function() {
    it('should post memory info OK', function(done) {
      const memory = {
        content: '今天我非常高兴',
        gps: '9.13716, -151.5152',
        position: '哈工大',
        AlbumId: '2',
      };
      request(server)
        .post('/memories')
        .send(memory)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.content.should.be.equal('今天我非常高兴');
          res.body.data.UserId.should.be.equal(1);
          res.body.data.AlbumId.should.be.equal('2');
          done();
        });
    });

    it('should post memory info 404', function(done) {
      const memory = {
        content: '今天我非常高兴',
        gps: '9.13716, -151.5152',
        position: '哈工大',
        AlbumId: '10000',
      };
      request(server)
        .post('/memories')
        .send(memory)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(404);
          res.body.message.should.be.equal('相册不存在');
          done();
        });
    });

    it('should post memory info 422', function(done) {
      const memory = {
        content: '今天我非常高兴',
        gps: '9.13716, -151.5152',
        position: '哈工大',
        AlbumId: 1,
      };
      request(server)
        .post('/memories')
        .send(memory)
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

  describe('DELETE /memories/: id', function() {
    it('should delete memory info OK', function(done) {
      request(server)
        .delete('/memories/1')
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

    it('should delete memory info 404', function(done) {
      request(server)
        .delete('/memories/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(404);
          res.body.message.should.be.equal('删除失败');
          done();
        });
    });

    it('should delete memory info 404', function(done) {
      request(server)
        .delete('/memories/12')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(404);
          res.body.message.should.be.equal('删除失败');
          done();
        });
    });

    it('should delete memory info 404', function(done) {
      request(server)
        .delete('/memories/10000')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(404);
          res.body.message.should.be.equal('删除失败');
          done();
        });
    });
  });
});
