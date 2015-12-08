'use strict';

const server = require('../../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/restful/albumUserCollaborates.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('POST /userUserFollows', function() {
    it('should create album user collaborate OK', function(done) {
      request(server)
        .post('/albumUserCollaborates')
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
          res.body.data.AlbumId.should.be.equal('11');
          res.body.data.UserId.should.be.equal('1');
          done();
        });
    });

    it('should create album user collaborate 422', function(done) {
      request(server)
        .post('/albumUserCollaborates')
        .send({
          AlbumId: '11',
          UserId: 2,
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

    it('should create album user collaborate 422', function(done) {
      request(server)
        .post('/albumUserCollaborates')
        .send({
          AlbumId: '11',
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

    it('should create album users collaborate OK', function(done) {
      request(server)
        .post('/albumUserCollaborates')
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
          res.body.data.length.should.be.equal(3);
          res.body.data[0].AlbumId.should.be.equal('11');
          res.body.data[1].AlbumId.should.be.equal('11');
          res.body.data[2].AlbumId.should.be.equal('11');
          done();
        });
    });

    it('should create album user collaborate 403', function(done) {
      request(server)
        .post('/albumUserCollaborates')
        .send({
          AlbumId: '30',
          UserId: '5',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(403);
          res.body.message.should.be.equal('相册不可加入');
          done();
        });
    });

    it('should create album users collaborate 403', function(done) {
      request(server)
        .post('/albumUserCollaborates')
        .send({
          AlbumId: '30',
          UserIds: '5,6,7',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(403);
          res.body.message.should.be.equal('相册不可加入');
          done();
        });
    });
  });
});
