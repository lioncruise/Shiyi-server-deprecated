'use strict';

const server = require('../../../server');
const http = require('http2');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/restful/feedbacks.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('GET /feedbacks/:id', function() {
    it('should get ones all feedbacks OK', function(done) {
      request(server)
        .get('/feedbacks')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(200);
          res.body.data.length.should.be.equal(3);
          res.body.data[0].should.have.properties(['id', 'content']);
          res.body.data[0].UserId.should.be.equal(1);
          done();
        });
    });
  });

  describe('GET /feedbacks/:id', function() {
    it('should get feedback info OK', function(done) {
      request(server)
        .get('/feedbacks/1')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(200);
          res.body.data.should.have.properties(['id', 'content']);
          res.body.data.id.should.be.equal(1);
          done();
        });
    });

    it('should get feedback info 404', function(done) {
      request(server)
        .get('/feedbacks/10000')
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(404);
          res.body.message.should.be.equal('反馈不存在');
          done();
        });
    });
  });

  describe('POST /feedbacks', function() {
    it('should post feedback info OK', function(done) {
      request(server)
        .post('/feedbacks')
        .send({
          content: '这是一条反馈',
          type: '建议',
        })
        .expect('Content-type', 'application/json; charset=utf-8')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          res.body.statusCode.should.equal(200);
          res.body.data.should.have.properties(['id', 'content']);
          res.body.data.UserId.should.be.equal(1);
          done();
        });
    });
  });
});
