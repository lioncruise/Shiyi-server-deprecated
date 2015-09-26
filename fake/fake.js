'use strict';

//插入各个Models的fake数据
var users = require('./users');
var albums = require('./albums');

module.exports = function*() {
  yield users;
  yield albums;
};