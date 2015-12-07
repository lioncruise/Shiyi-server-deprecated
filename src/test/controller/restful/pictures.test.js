'use strict';

const server = require('../../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/restful/pictures.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /pictures/:id', function() {
    it('should get picture info OK', function(done) {
      request(server)
        .get('/pictures/8')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(8);
          res.body.data.UserId.should.be.a.Number();
          res.body.data.AlbumId.should.be.a.Number();
          res.body.data.MemoryId.should.be.a.Number();
          done();
        });
    });

    it('should get picture info 404', function(done) {
      request(server)
        .get('/pictures/10000')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(404);
          res.body.message.should.be.equal('图片不存在');
          done();
        });
    });

    it('should get picture info with album OK', function(done) {
      request(server)
        .get('/pictures/8?isWithAlbum=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(8);
          res.body.data.UserId.should.be.a.Number();
          res.body.data.Album.id.should.be.equal(2);
          done();
        });
    });

    it('should get picture info with memory OK', function(done) {
      request(server)
        .get('/pictures/8?isWithMemory=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(8);
          res.body.data.AlbumId.should.be.a.Number();
          res.body.data.Memory.id.should.be.equal(5);
          done();
        });
    });

    it('should get picture info with user OK', function(done) {
      request(server)
        .get('/pictures/8?isWithUser=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(8);
          res.body.data.AlbumId.should.be.a.Number();
          res.body.data.User.id.should.be.equal(1);
          done();
        });
    });

    it('should get picture info with user and album OK', function(done) {
      request(server)
        .get('/pictures/8?isWithUser=true&isWithAlbum=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(8);
          res.body.data.AlbumId.should.be.a.Number();
          res.body.data.User.id.should.be.equal(1);
          res.body.data.Album.id.should.be.equal(2);
          done();
        });
    });
  });

  describe('POST /pictures', function() {
    it('should create picture info OK', function(done) {
      const picture = {
        storeKey: '123.jpg',
        type: 'picture',
        AlbumId: '2',
        MemoryId: '5',
      };
      request(server)
        .post('/pictures')
        .send(picture)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.UserId.should.be.equal(1);
          res.body.data.AlbumId.should.be.equal('2');
          res.body.data.MemoryId.should.be.equal('5');
          res.body.data.type.should.be.equal('picture');
          done();
        });
    });

    it('should create video info OK', function(done) {
      const video = {
        storeKey: '123.jpg',
        type: 'video',
        AlbumId: '2',
        MemoryId: '5',
      };
      request(server)
        .post('/pictures')
        .send(video)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.UserId.should.be.equal(1);
          res.body.data.AlbumId.should.be.equal('2');
          res.body.data.MemoryId.should.be.equal('5');
          res.body.data.type.should.be.equal('video');
          done();
        });
    });

  });
});
