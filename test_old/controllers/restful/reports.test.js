'use strict';

var server = require('../../../server');
var http = require('http');
var request = require('supertest');
var mm = require('mm');
var should = require('should');


describe('test/controllers/restful/reports.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /reports/:id', function() {
    it('should get report info OK', function(done) {
      request(server)
        .get('/reports/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200, done);
    });

    it('should get status 404', function(done) {
      request(server)
        .get('/reports/10000')
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

  describe('POST /reports', function() {
    var report = {
      ActionId: '1'
    };

    it('should create new report OK', function(done) {
      request(server)
        .post('/reports')
        .send(report)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.should.have.properties(['ActionId']);
          done();
        });
    });
  });
});