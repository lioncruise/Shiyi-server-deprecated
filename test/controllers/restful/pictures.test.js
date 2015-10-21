'use strict';

var server = require('../../../server');
var http = require('http');
var request = require('supertest');
var mm = require('mm');
var should = require('should');


describe('test/controllers/restful/pictures.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /pictures/:id', function() {
    it('should get picture info OK', function(done) {
      request(server)
        .get('/pictures/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200, done);
    });

    it('should get status 404', function(done) {
      request(server)
        .get('/pictures/10000')
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

  describe('POST /pictures', function() {
    var picture = {
      pictureUrl: 'http://test.com/10086',
      AlbumId: '1',
      ActionId: '1'
    };

    it('should create new picture OK', function(done) {
      request(server)
        .post('/pictures')
        .send(picture)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.should.have.properties(['pictureUrl']);
          done();
        });
    });
  });

  describe('DELETE /pictures/:id', function() {
    it('should delete picture OK', function(done) {
      request(server)
        .delete('/pictures/3')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.not.have.property('data');
          done();
        });
    });

    it('should get status 404', function(done) {
      request(server)
        .delete('/pictures/11111')
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