'use strict';

const LRU = require('lru-cache');
const config = require('../config');

let keyValueCache = LRU({
  maxAge: 1000 * 60 * 60,
});

let userCodeCache = LRU({
  maxAge: 1000 * 60 * 5,
});

if (config.debug) {
  userCodeCache.set('123456', 50);
}

module.exports = {
  keyValueCache,
  userCodeCache,
};
