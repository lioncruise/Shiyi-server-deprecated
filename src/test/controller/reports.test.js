'use strict';

const server = require('../../server');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('test/controllers/restful/reports.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /reports', function() {
    it('should get all reports of a user OK', function(done) {
      request(server)
        .get('/reports')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.data.length.should.equal(4);
          done();
        });
    });
  });

  describe('GET /reports/:id', function() {
    it('should get one report of a user OK', function(done) {
      request(server)
        .get('/reports/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(200);
          res.body.data.should.have.properties(['id', 'status', 'content']);
          done();
        });
    });

  });

  describe('POST /reports', function() {
    it('should create report to a user OK', function(done) {
      let data = {
        content: 'add report test TargetUserId',
        TargetUserId: '5',
      };
      request(server)
        .post('/reports')
        .send(data)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.data.should.have.properties(['id', 'status', 'content']);
          done();
        });
    });

    it('should create report to a album OK', function(done) {
      let data = {
        content: 'add report test AlbumId',
        AlbumId: '5',
      };
      request(server)
        .post('/reports')
        .send(data)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.data.should.have.properties(['id', 'status', 'content']);
          done();
        });
    });

    it('should create report to a memory OK', function(done) {
      let data = {
        content: 'add report test MemoryId',
        MemoryId: '5',
      };
      request(server)
        .post('/reports')
        .send(data)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.data.should.have.properties(['id', 'status', 'content']);
          done();
        });
    });

    it('should create report to a photo OK', function(done) {
      let data = {
        content: 'add report test PhotoId',
        PictureId: '5',
      };
      request(server)
        .post('/reports')
        .send(data)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.data.should.have.properties(['id', 'status', 'content']);
          done();
        });
    });

    it('should not create report cause no target OK', function(done) {
      //report对象至少要指定一个
      let data = {
        content: 'add report test None',
      };
      request(server)
        .post('/reports')
        .send(data)
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(403);
          res.body.message.should.equal('report对象至少要指定一个');
          done();
        });
    });

  });

});
