'use strict';

var server = require('../../server');
var http = require('http');
var request = require('supertest');
var mm = require('mm');
var should = require('should');

describe('test/controllers/version.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('get /getVersion', function() {
    it('should get android version ok', function(done) {
      request(server)
        .get('/getVersion?type=android')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(200);
          res.body.should.have.properties(['version', 'downloadUrl']);
          done();
        });
    });

    it('should get ios version ok', function(done) {
      request(server)
        .get('/getVersion?type=ios')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(200);
          res.body.should.have.properties(['version', 'downloadUrl']);
          done();
        });
    });

    it('should get statusCode 404', function(done) {
      request(server)
        .get('/getVersion?type=wp')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(404);
          res.body.should.have.properties(['statusCode', 'message']);
          done();
        });
    });
  });
});