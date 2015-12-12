'use strict';

const config = require('../config');
const urllib = require('urllib');
const debug = require('debug')('utils/index');
const util = require('util');
const utility = require('utility');

exports.notification = require('./notification');
exports.models = require('./models');

exports.cloneJson = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

exports.escapeRegExp = function(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

exports.getJoinAlbumSecCode = function(albumId) {
  return utility.md5(albumId + 'It is the secret code!').substr(0, 6);
};
