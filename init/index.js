'use strict';

var co = require('co');
var init = require('./init');
var debug = require('debug')('init/index');

co(init).catch(onerror);

function onerror(err) {
  console.error(err.stack);
}