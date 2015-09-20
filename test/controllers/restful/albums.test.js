'use strict';

var server = require('../../../server');
var http = require('http');
var request = require('supertest');
var mm = require('mm');
var should = require('should');


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

  describe('POST /albums', function() {
    it('should create new album OK', function(done) {
      var album = {
        title: '哈工大二公寓',
        description: '人间第二地狱',
        tags: '哈工大,破,公寓,男生',
        isShare: true,
        isPublic: true,
        isShowRawInfo: true,
        allowLike: true,
        allowComment: true,
        UserId: 1
      };

      request(server)
        .post('/albums')
        .send(album)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.have.properties(['title', 'description', 'isShare', 'isPublic']);
          done();
        });
    });
  });

  describe('PUT /albums', function() {
    it('should update album OK', function(done) {
      var album = {
        title: '哈工大三公寓',
        description: '人间第三地狱',
        tags: '哈工大,破,公寓,女生',
        isShare: false
      };

      request(server)
        .put('/albums/1')
        .send(album)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.should.have.properties(['title', 'description', 'isShare', 'isPublic']);
          done();
        });
    });
  });
});