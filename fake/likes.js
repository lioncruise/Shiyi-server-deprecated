'use strict';

var db = require('../db');
var debug = require('debug')('fake/likes');

var likes = [];

likes.push({
  type: '1',
  ActionId: 1,
  UserId: 1
});

likes.push({
  type: '1',
  ActionId: 1,
  UserId: 2
});

likes.push({
  type: '1',
  ActionId: 1,
  UserId: 3
});

likes.push({
  type: '1',
  PictureId: 1,
  UserId: 1
});

likes.push({
  type: '1',
  PictureId: 2,
  UserId: 1
});

likes.push({
  type: '1',
  PictureId: 3,
  UserId: 1
});

module.exports = function*() {
  yield likes.map(function(like) {
    return db.models.Like.create(like);
  });
  debug('likes data fake finish.');
};

module.exports.fakeLikes = likes;