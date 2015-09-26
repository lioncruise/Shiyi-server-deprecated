'use strict';

//插入各个Models的fake数据
var users = require('./users');
var albums = require('./albums');
var keyvalue = require('./keyvalue');

module.exports = function*() {
  yield keyvalue;
  yield users;
  yield albums;
};