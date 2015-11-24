'use strict';

const LRU = require('lru-cache');

let cache = LRU({
  maxAge: 1000 * 60 * 60,
});

module.exports = cache;
