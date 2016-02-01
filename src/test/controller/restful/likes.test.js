'use strict';

const server = require('../../../server');
const http = require('http2');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/restful/albums.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('POST /likes', function() {
    it('should create new like to a picture OK', function(done) {
      const like = {
        type: 'LL',
        MemoryId: '10',
        AlbumId: '4',
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

          res.body.statusCode.should.be.equal(200);
          res.body.data.MemoryId.should.be.equal('10');
          res.body.data.AlbumId.should.be.equal('4');
          res.body.data.UserId.should.be.equal(1);
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

    it('should delete like 404', function(done) {
      request(server)
        .delete('/likes/1')
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

    it('should delete like 404', function(done) {
      request(server)
        .delete('/likes/8')
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

    it('should delete like 404', function(done) {
      request(server)
        .delete('/likes/10000')
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
