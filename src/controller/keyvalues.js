'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');
const cache = require('../cache');

exports.getKeyValueFromDB = function*(key) {
  return yield models.Keyvalue.find({
    where: {
      key,
    },
  });
};

exports.getKey = function*(key) {
  if (cache.has(key)) {
    return cache.get(key);
  } else {
    const value = yield exports.getKeyValueFromDB(key);
    cache.set(key, value);
    return value;
  }
};

router.get('/getValue', function*() {
  this.body = yield exports.getKey(this.query.key);
});

router.post('/resetCache', function*() {
  cache.reset();
});
