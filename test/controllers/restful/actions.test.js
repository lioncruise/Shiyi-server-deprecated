'use strict';

var server = require('../../../server');
var http = require('http');
var request = require('supertest');
var mm = require('mm');
var should = require('should');

describe('test/controllers/restful/actions.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /actions/:id', function() {
    it('should get action OK', function(done) {
      request(server)
        .get('/actions/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.Album.pictureCount.should.be.a.Number();
          res.body.data.likeCount.should.be.a.Number();
          done();
        });
    });

    it('should get status 404', function(done) {
      request(server)
        .get('/actions/10000')
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

  describe('POST /actions', function() {
    var action = {
      content: '这是一条动态：23333333。',
      gps: 'gps',
      position: 'position',
      AlbumId: 2
    };

    it('should create new action OK', function(done) {
      request(server)
        .post('/actions')
        .send(action)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.should.have.properties(['content', 'gps', 'position']);
          done();
        });
    });
  });

  describe('DELETE /actions', function() {
    it('should delete action OK', function(done) {
      request(server)
        .delete('/actions/2')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.isDeleted.should.be.true();
          res.body.data.should.have.properties(['content', 'gps', 'position']);
          done();
        });
    });

    it('should get status 404', function(done) {
      request(server)
        .delete('/actions/11111')
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