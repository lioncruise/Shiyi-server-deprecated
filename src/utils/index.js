'use strict';

const config = require('../config');
const urllib = require('urllib');
const debug = require('debug')('utils/index');
const util = require('util');

exports.notification = require('./notification');
exports.models = require('./models');

exports.cloneJson = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

exports.escapeRegExp = function(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};
