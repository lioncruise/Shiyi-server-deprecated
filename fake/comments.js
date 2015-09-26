'use strict';

var db = require('../db');
var debug = require('debug')('fake/comments');


var comments = [];

comments.push({
  PictureId: 1,
  UserId: 1,
  content: '这是用户1对图片1的评论。'
});

comments.push({
  PictureId: 1,
  UserId: 2,
  content: '这是用户2对图片1的评论。'
});

comments.push({
  PictureId: 1,
  UserId: 1,
  content: '这是用户1对用户2的回复。',
  OrignalCommentId: 2
});

module.exports = function*() {
  yield comments.map(function(comment) {
    return db.models.Comment.create(comment);
  });
  debug('comments data fake finish.');
};

module.exports.fakeComments = comments;