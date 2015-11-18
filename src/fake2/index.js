'use strict';

var co = require('co');
var fake = require('./fake');

co(fake).catch(onerror);

function onerror(err) {
  console.error(err.stack);
}