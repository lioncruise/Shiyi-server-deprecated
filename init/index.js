'use strict';

var db = require('../db');
var debug = require('debug')('init/index');

new Promise(db.init).then(function () {
  debug('Database init finish.');
});