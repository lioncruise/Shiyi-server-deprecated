'use strict';

const redis = require('redis');
const debug = require('debug')('util/redisToken');

const redisConfig = require('../config').redis;

let redisClient = null;

function init() {
  if(redisClient === null) {
    redisClient = redis.createClient(redisConfig.port);

    redisClient.on('error', function(err) {
      debug('Error ' + err);
    });

    redisClient.on('connect', function() {
      debug('Redis is ready');
    });
  }
}

function * set(id, token) {

}

function * verify(id, token){

}

exports = {
  init,
  set,
  verify,
};
