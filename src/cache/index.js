'use strict';

const LRU = require('lru-cache');

let keyValueCache = LRU({
  maxAge: 1000 * 60 * 60,
});

let userCodeCache = LRU({
  maxAge: 1000 * 60 * 5,
});

module.exports = {
  keyValueCache,
  userCodeCache,
};
