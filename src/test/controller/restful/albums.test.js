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

    // it('should get album info 422', function(done) {
    //   request(server)
    //     .get('/albums/###')
    //     .expect('Content-type', 'application/json; charset=utf-8')
    //     .expect(200)
    //     .end(function(err, res) {
    //       if (err) {
    //         return done(err);
    //       }

    //       console.log(res.body);
    //       res.body.statusCode.should.be.equal(422);
    //       done();
    //     });
    // });

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

  describe('POST /albums', function() {
    let album = {
      title: '哈工大二公寓',
      description: '人间第二地狱',
      tags: '哈工大,破,公寓,男生',
      coverStoreKey: '123.jpg',
      isPublic: 'private',
      allowComment: 'collaborators',
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

          res.body.statusCode.should.be.equal(200);
          res.body.data.tags.should.be.equal('哈工大,破,公寓,男生');
          res.body.data.coverStoreKey.should.be.equal('123.jpg');
          res.body.data.isPublic.should.be.equal('private');
          res.body.data.allowComment.should.be.equal('collaborators');
          done();
        });
    });

    it('should create new album without tags OK', function(done) {
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

          res.body.statusCode.should.be.equal(200);
          res.body.data.tags.should.be.equal('');
          res.body.data.coverStoreKey.should.be.equal('123.jpg');
          res.body.data.isPublic.should.be.equal('private');
          res.body.data.allowComment.should.be.equal('collaborators');
          done();
        });
    });

    it('should get status 422', function(done) {
      album.isPublic = 123;
      request(server)
        .post('/albums')
        .send(album)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.message.should.equal('Validation Failed');
          res.body.statusCode.should.equal(422);
          done();
        });
    });

  });

  describe('PUT /albums/:id', function() {
    it('should update album OK', function(done) {
      let album = {
        title: '哈工大三公寓',
        description: '人间第三地狱',
        tags: '哈工大,破,公寓,女生',
        isPublic: 'public',
        allowComment: 'anyone',
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

          res.body.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should update album without tags OK', function(done) {
      let album = {
        title: '哈工大三公寓',
        description: '人间第三地狱就是666',
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

          res.body.statusCode.should.be.equal(200);
          done();
        });
    });

    it('should get statusCode 404', function(done) {
      let album = {
        title: '哈工大二公寓',
        description: '人间第二地狱',
        tags: '哈工大,破,公寓,男生',
        coverStoreKey: '123.jpg',
        isPublic: 'private',
        allowComment: 'collaborators',
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

          console.log(res.body);

          res.body.statusCode.should.be.equal(404);
          done();
        });
    });
  });
});
