'use strict';

var server = require('../../../server');
var http = require('http');
var request = require('supertest');
var mm = require('mm');


describe('test/controllers/restful/users.test.js', function () {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /users/:id', function () {
    it('should get user info OK', function (done) {
      request(server)
      .get('/users/1')
      .expect('Content-type', 'application/json; charset=utf-8')
      .expect(200, done);
    });
  });
});