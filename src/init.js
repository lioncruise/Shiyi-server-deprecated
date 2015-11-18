'use strict';

const db = require('./db');
const fse = require('co-fs-extra');
const config = require('./config');
const co = require('co');

exports.run = co.wrap(function*() {
  yield db.init;
  console.log('Database init finish.');
});
