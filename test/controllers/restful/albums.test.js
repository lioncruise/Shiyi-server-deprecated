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

    it('should get status 404', function(done) {
      request(server)
        .get('/albums/10000')
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

  describe('POST /albums', function() {
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

    it('should create new album OK', function(done) {
      request(server)
        .post('/albums')
        .send(album)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.should.have.properties(['title', 'description', 'isShare', 'isPublic']);
          done();
        });
    });

    it('should create new album OK without tags', function(done) {
      album.tags = '';
      request(server)
        .post('/albums')
        .send(album)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.should.have.properties(['title', 'description', 'isShare', 'isPublic']);
          done();
        });
    });

    it('should get status 422', function(done) {
      album.isShare = 123;
      request(server)
        .post('/albums')
        .send(album)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.statusCode.should.equal(422);
          res.body.should.have.properties(['statusCode', 'message']);
          done();
        });
    });
  });

  describe('PUT /albums/:id', function() {
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
          res.body.data.should.have.properties(['title', 'description', 'isShare', 'isPublic']);
          done();
        });
    });

    it('should update album OK without tags', function(done) {
      var album = {
        title: '哈工大三公寓',
        description: '人间第三地狱就是666'
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
          res.body.data.should.have.properties(['title', 'description', 'isShare', 'isPublic']);
          done();
        });
    });

    it('should get statusCode 404', function(done) {
      var album = {
        title: '哈工大三公寓',
        description: '人间第三地狱',
        tags: '哈工大,破,公寓,女生',
        isShare: false
      };

      request(server)
        .put('/albums/10000')
        .send(album)
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

  describe('DELETE /albums/:id', function() {
    it('should delete album OK', function(done) {
      request(server)
        .delete('/albums/3')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          res.body.data.isDeleted.should.be.true();
          res.body.data.should.have.properties(['title', 'description', 'isShare', 'isPublic']);
          done();
        });
    });

    it('should get status 404', function(done) {
      request(server)
        .delete('/albums/11111')
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