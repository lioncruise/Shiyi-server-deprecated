'use strict';

const server = require('../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/keyvalues.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /getValue', function() {
    it('should get value OK', function(done) {
      request(server)
        .get('/getValue?key=androidVersion')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.key.should.be.equal('androidVersion');
          res.body.data.value.should.be.equal('0.0.1');
          done();
        });
    });

    it('should get value OK', function(done) {
      request(server)
        .get('/getValue?key=iosVersion')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.key.should.be.equal('iosVersion');
          res.body.data.value.should.be.equal('0.0.1');
          done();
        });
    });
  });

  describe('POST /resetCache', function() {
    it('should reset cache OK', function(done) {
      request(server)
        .post('/resetCache')
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
