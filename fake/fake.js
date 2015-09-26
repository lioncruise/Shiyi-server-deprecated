'use strict';

//插入各个Models的fake数据
var users = require('./users');
var albums = require('./albums');
var keyvalues = require('./keyvalues');
var actions = require('./actions');
var pictures = require('./pictures');
var likes = require('./likes');

module.exports = function*() {
  yield keyvalues;
  yield users;
  yield albums;
  yield actions;
  yield pictures;
  yield likes;
};