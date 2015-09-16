'use strict';

var db = require('../db');
var co = require('co');
var debug = require('debug')('init/index');
var fse = require('co-fs-extra');
var config = require('../config');

co(function*() {
  yield fse.remove(config.db.storage);
  yield db.init;
  debug('Database init finish.');
});