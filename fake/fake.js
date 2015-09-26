'use strict';

//插入各个Models的fake数据
var users = require('./users');
var albums = require('./albums');
var keyvalues = require('./keyvalues');
var actions = require('./actions');
var pictures = require('./pictures');
var likes = require('./likes');
var comments = require('./comments');
var messages = require('./messages');

module.exports = function*() {
  yield keyvalues.fake;
  yield users.fake;
  yield albums.fake;
  yield actions.fake;
  yield pictures.fake;
  yield likes.fake;
  yield comments.fake;
  yield messages.fake;
};