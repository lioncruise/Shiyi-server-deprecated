'use strict';

const server = require('../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/userUserFollows.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('DELETE /userUserFollows', function() {
    it('should delete user user follow OK', function(done) {
      request(server)
        .delete('/userUserFollows')
        .send({
          TargetUserId: '1',
          UserId: '2',
        })
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

    it('should delete user users follow OK', function(done) {
      request(server)
        .delete('/userUserFollows')
        .send({
          TargetUserId: '1',
          UserIds: '3,4,5',
        })
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
  });
});
