'use strict';

var db = require('../db');
var debug = require('debug')('fake/messages');


var messages = [];

messages.push({
  UserId: 2,
  TargetUserId: 1,
  type: 'C',
  CommentId: 2
});

messages.push({
  UserId: 1,
  TargetUserId: 2,
  type: 'C',
  CommentId: 3
});

messages.push({
  UserId: 1,
  TargetUserId: 2,
  type: 'L',
  LikeId: 2
});

messages.push({
  UserId: 1,
  TargetUserId: 2,
  type: 'B',
  content: '这是一条广告。'
});

module.exports = function*() {
  yield messages.map(function(message) {
    return db.models.Message.create(message);
  });
  debug('messages data fake finish.');
};

module.exports.fakeMessages = messages;