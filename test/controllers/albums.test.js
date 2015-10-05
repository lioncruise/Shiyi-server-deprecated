'use strict';

var server = require('../../server');
var http = require('http');
var request = require('supertest');
var mm = require('mm');
var should = require('should');
var models = require('../../db').models;
var utils = require('../../utils');
var utility = require('utility');

describe('test/controllers/albums.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /getOwnAlbums', function() {
    it('should get own albums ok', function(done) {
      request(server)
        .get('/getOwnAlbums')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          var albums = res.body;
          res.body.forEach(function(album) {
            album.UserId.should.be.equal(1);
          });
          done();
        });
    });

    it('should get own albums with query userId param ok', function(done) {
      request(server)
        .get('/getOwnAlbums?userId=2')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          var albums = res.body;
          res.body.forEach(function(album) {
            album.UserId.should.be.equal(2);
          });
          done();
        });
    });

    it('should get own albums with query userId param statusCode 404 ok', function(done) {
      request(server)
        .get('/getOwnAlbums?userId=2000')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(404);
          done();
        });
    });
  });

  describe('GET /getRelatedAlbums', function() {
    it('should get related albums ok', function(done) {
      request(server)
        .get('/getRelatedAlbums')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          var albums = res.body;
          res.body.forEach(function(album) {
            album.UserId.should.not.be.equal(1);
          });
          done();
        });
    });

    it('should get related albums with query userId param ok', function(done) {
      request(server)
        .get('/getRelatedAlbums?userId=2')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          var albums = res.body;
          res.body.forEach(function(album) {
            album.UserId.should.not.be.equal(2);
          });
          done();
        });
    });

    it('should get related albums with query userId param statusCode 404 ok', function(done) {
      request(server)
        .get('/getRelatedAlbums?userId=2000')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.be.equal(404);
          done();
        });
    });
  });
});