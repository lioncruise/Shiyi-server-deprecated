'use strict';

const server = require('../../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/restful/albumUserFollows.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('POST /albumUserFollows', function() {
    it('should create album user follow OK', function(done) {
      request(server)
        .post('/albumUserFollows')
        .send({
          AlbumId: '11',
          UserId: '5',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          console.log(res.body);
          res.body.statusCode.should.be.equal(200);
          res.body.data.AlbumId.should.be.equal('11');
          res.body.data.UserId.should.be.equal('5');
          done();
        });
    });

    it('should create album user follow 422', function(done) {
      request(server)
        .post('/albumUserFollows')
        .send({
          AlbumId: 11,
          UserId: '5',
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

    it('should create album user follow 422', function(done) {
      request(server)
        .post('/albumUserFollows')
        .send({
          AlbumId: 11,
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

    it('should create album users follow OK', function(done) {
      request(server)
        .post('/albumUserFollows')
        .send({
          AlbumId: '11',
          UserIds: '6,7,8',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.length.should.be.equal(3);
          res.body.data[0].AlbumId.should.be.equal('11');
          res.body.data[1].AlbumId.should.be.equal('11');
          res.body.data[2].AlbumId.should.be.equal('11');
          done();
        });
    });
  });
});
