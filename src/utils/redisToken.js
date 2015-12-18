'use strict';

const redis = require('redis');
const debug = require('debug')('util/redisToken');

const redisConfig = require('../config').redis;

let redisClient = null;

function init() {
  if (redisClient === null) {
    redisClient = redis.createClient(redisConfig);

    redisClient.on('error', function(err) {
      debug('Error ' + err);
    });

    redisClient.on('connect', function() {
      debug('Redis is ready');
    });
  }
}

// 生成用于验证token用户登录唯一性 时间戳 连接 4位随机数
function verifyCode() {
  return Date.parse(new Date()).toString() + parseInt(Math.random() * 10000);
}

function save(id, token) {
  return redisClient.set(id, token);
}

function * verify(id, token) {
  return token === (yield redisClient.get(id));
}

function remove(id) {
  return redisClient.del(id);
}

module.exports = {
  init,
  verifyCode,
  save,
  verify,
  remove,
};
