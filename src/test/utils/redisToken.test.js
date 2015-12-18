'use strict';

const redisToken = require('../../utils').redisToken;
const should = require('should');

describe('utils/redisToken', function() {
  it('should set and get a key value', function(done) {
    redisToken.init();
    redisToken.save('key', 'val');
    redisToken.verify('key', 'val').then(function(value) {
      value.should.equal(true);
      done();
    });
  });

  it('should set and get a key value', function(done) {
    redisToken.init();
    redisToken.save('key', 'val2');
    redisToken.verify('key', 'val1').then(function(value) {
      value.should.equal(false);
      done();
    });
  });

});
