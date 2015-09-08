'use strict';

var db = require('../db');

db.init.then(function () {
  console.log('Database init finish.');
});