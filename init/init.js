'use strict';

var db = require('../db');
var debug = require('debug')('init/init');
var fse = require('co-fs-extra');
var config = require('../config');

module.exports = function*() {
  yield fse.remove(config.db.storage);
  yield db.init;
  debug('Database init finish.');
};