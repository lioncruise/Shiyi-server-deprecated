'use strict';

const LRU = require('lru-cache');
const config = require('../config');

let keyValueCache = LRU({
  maxAge: 1000 * 60 * 60,
});

let userCodeCache = LRU({
  maxAge: 1000 * 60 * 5,
});

let userSecCodeCache = LRU({
  maxAge: 1000 * 60 * 5,
});

let responseCache =  LRU({
  maxAge: 1000 * 60 * 5,
});

if (config.debug) {
  userCodeCache.set('123456', 50);
  userSecCodeCache.set('15945990589', true);
}

module.exports = {
  keyValueCache,
  userCodeCache,
  userSecCodeCache,
  responseCache,
};
