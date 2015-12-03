'use strict';

const server = require('../../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/restful/albums.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /albums/:id', function() {
    it('should get album info OK', function(done) {
      request(server)
        .get('/albums/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(1);
          res.body.data.picturesCount.should.be.a.Number();
          done();
        });
    });

    it('should get album info 404', function(done) {
      request(server)
        .get('/albums/10000')
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

    it('should get album info with limit and offset OK', function(done) {
      request(server)
        .get('/albums/1?limit=1&offset=1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.id.should.be.equal(1);
          res.body.data.picturesCount.should.be.a.Number();
          done();
        });
    });

    it('should get album info with memories and without limit and offset OK', function(done) {
      request(server)
        .get('/albums/1?isWithMemories=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.should.have.property('Memories');
          done();
        });
    });

    it('should get album info with memories and with limit and offset OK', function(done) {
      request(server)
        .get('/albums/1?isWithMemories=true&offset=0&limit=1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.Memories.length.should.be.equal(1);
          done();
        });
    });

    it('should get album info with pictures and without limit and offset OK', function(done) {
      request(server)
        .get('/albums/1?isWithPictures=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.should.have.property('Pictures');
          done();
        });
    });

    it('should get album info with pictures and with limit and offset OK', function(done) {
      request(server)
        .get('/albums/1?isWithPictures=true&offset=0&limit=2')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.Pictures.length.should.be.equal(2);
          done();
        });
    });

    it('should get album info with recent picture OK', function(done) {
      request(server)
        .get('/albums/1?isWithRecentPicture=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          console.log(res.body);
          res.body.data.should.have.property('RecentPictureId');
          done();
        });
    });

    it('should get album info with user OK', function(done) {
      request(server)
        .get('/albums/1?isWithUser=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.should.have.property('User');
          res.body.data.User.id.should.be.a.Number();
          done();
        });
    });

    it('should get album info with collaborators OK', function(done) {
      request(server)
        .get('/albums/1?isWithCollaborators=true')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.should.have.property('collaborators');
          done();
        });
    });
  });
});