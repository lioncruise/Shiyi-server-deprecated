'use strict';

const server = require('../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/albums.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /getOwnAlbums', function() {
    it('should get own album info OK', function(done) {
      request(server)
        .get('/getOwnAlbums')
        .expect('Content-type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data[0].UserId.should.be.equal(1);
          res.body.data[0].should.have.properties(['title', 'coverStoreKey', 'description']);
          res.body.data[0].RecentPictureId.should.be.a.Number();
          done();
        });
    });

    it('should get own album info with user id OK', function(done) {
      request(server)
        .get('/getOwnAlbums?userId=2')
        .expect('Content-type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data[0].UserId.should.be.equal(2);
          res.body.data[0].should.have.properties(['title', 'coverStoreKey', 'description']);
          res.body.data[0].RecentPictureId.should.be.a.Number();
          res.body.data.length.should.be.equal(3);
          done();
        });
    });

    it('should get own album info with rencent picture OK', function(done) {
      request(server)
        .get('/getOwnAlbums?isWithRecentPicture=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data[0].UserId.should.be.equal(1);
          res.body.data[0].should.have.properties(['title', 'coverStoreKey', 'description']);
          res.body.data[0].RecentPictureId.should.be.a.Number();
          res.body.data.length.should.be.a.Number();
          res.body.data[0].RecentPicture.id.should.be.a.Number();
          res.body.data[0].RecentPicture.User.id.should.be.equal(1);
          done();
        });
    });

    it('should get own album info with user id and rencent picture OK', function(done) {
      request(server)
        .get('/getOwnAlbums?userId=2&isWithRecentPicture=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data[0].UserId.should.be.equal(2);
          res.body.data[0].should.have.properties(['title', 'coverStoreKey', 'description']);
          res.body.data[0].RecentPictureId.should.be.a.Number();
          res.body.data.length.should.be.equal(3);
          res.body.data[0].RecentPicture.id.should.be.a.Number();
          res.body.data[0].RecentPicture.User.id.should.be.equal(2);
          done();
        });
    });
  });

  describe('GET /getRelatedAlbums', function() {
    it('should get related album info OK', function(done) {
      request(server)
        .get('/getRelatedAlbums')
        .expect('Content-type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.should.have.property('data');
          done();
        });
    });
  });

  describe('GET /getFollowAlbums', function() {
    it('should get followed album info OK', function(done) {
      request(server)
        .get('/getFollowAlbums')
        .expect('Content-type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.should.have.property('data');
          done();
        });
    });
  });
});
