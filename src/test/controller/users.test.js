'use strict';

const server = require('../../server');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/users.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /getFollowers', function() {
    it('should get followers OK', function(done) {
      request(server)
        .get('/getFollowers')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.length.should.be.above(0);
          res.body.data[0].id.should.be.a.Number();
          done();
        });
    });

    it('should get followers with limit and offset OK', function(done) {
      request(server)
        .get('/getFollowers?offset=1&limit=2')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.length.should.be.above(0);
          res.body.data[0].id.should.be.a.Number();
          done();
        });
    });

    it('should get followers with user id OK', function(done) {
      request(server)
        .get('/getFollowers?userId=1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.length.should.be.above(0);
          res.body.data[0].id.should.be.a.Number();
          done();
        });
    });

    it('should get followers with user id and limit and offset OK', function(done) {
      request(server)
        .get('/getFollowers?userId=1&offset=1&limit=2')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.length.should.be.above(0);
          res.body.data[0].id.should.be.a.Number();
          done();
        });
    });
  });

  describe('GET /getFans', function() {
    it('should get fans OK', function(done) {
      request(server)
        .get('/getFans')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.length.should.be.above(0);
          res.body.data[0].id.should.be.a.Number();
          done();
        });
    });

    it('should get fans with user id OK', function(done) {
      request(server)
        .get('/getFans?userId=1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.length.should.be.above(0);
          res.body.data[0].id.should.be.a.Number();
          done();
        });
    });

    it('should get fans with limit and offset OK', function(done) {
      request(server)
        .get('/getFans?userId=1&offset=1&limit=2')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.length.should.be.above(0);
          res.body.data[0].id.should.be.a.Number();
          done();
        });
    });
  });

  describe('GET /getUserUserRelation', function() {
    it('should get one user with current user relation OK', function(done) {
      request(server)
        .get('/getUserUserRelation?userId=1&targetUserId=2')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(200);
          res.body.data.should.be.equal('1');
          done();
        });
    });

    it('should get one user with current user relation 422', function(done) {
      request(server)
        .get('/getUserUserRelation?userId=1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.be.equal(422);
          res.body.message.should.be.equal('Validation Failed');
          done();
        });
    });
  });
});
