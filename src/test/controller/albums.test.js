'use strict';

const server = require('../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('test/controllers/restful/albums.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /albums/:id', function() {
    it('should get album info OK', function(done) {
      request(server)
        .get('/albums/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200, done);
    });
  });
});
