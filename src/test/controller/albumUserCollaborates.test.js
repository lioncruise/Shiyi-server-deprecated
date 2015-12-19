'use strict';

const server = require('../../server');
const http = require('http');
const request = require('supertest');
const mm = require('mm');
const should = require('should');

describe('src/test/controllers/albumUserCollaborates.test.js', function() {
  before(server.listen.bind(server, 0));
  after(server.close.bind(server));
  afterEach(mm.restore);

  describe('DELETE /albumUserCollaborates', function() {
    it('should delete album user collaborate OK', function(done) {
      request(server)
        .delete('/albumUserCollaborates')
        .send({
          AlbumId: '2',
          UserId: '10',
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

    it('should delete album user collaborate 422', function(done) {
      request(server)
        .delete('/albumUserCollaborates')
        .send({
          AlbumId: '3',
        })
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
