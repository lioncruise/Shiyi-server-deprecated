'use strict';

var co = require('co');

//插入各个Models的fake数据
var users = require('./users');
var albums = require('./albums');

co(function*() {
  yield users;
  yield albums;
});