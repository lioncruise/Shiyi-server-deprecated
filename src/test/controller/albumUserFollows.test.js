'use strict';

const server = require('../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/albumUserFollows.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);
  
  describe('DELETE /albumUserFollows', function() {
    it('should delete album user follow OK', function(done) {
      request(server)
        .delete('/albumUserFollows')
        .send({
          AlbumId: '11',
          UserId: '1',
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

    it('should delete album user follow 422', function(done) {
      request(server)
        .delete('/albumUserFollows')
        .send({
          AlbumId: 3,
          UserId: '10',
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

    it('should delete album user follow 422', function(done) {
      request(server)
        .delete('/albumUserFollows')
        .send({
          AlbumId: '3',
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

    it('should delete album users follow OK', function(done) {
      request(server)
        .delete('/albumUserFollows')
        .send({
          AlbumId: '11',
          UserIds: '2,3,4',
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
  });
});
