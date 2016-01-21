'use strict';

const server = require('../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/dailies.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /sendDaily', function() {
    it('should send daily OK', function(done) {
      request(server)
        .get('/sendDaily?id=2')
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
