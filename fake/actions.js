'use strict';

var db = require('../db');
var debug = require('debug')('fake/actions');

var actions = [];

actions.push({
  content: '这是一条动态。',
  gps: 'gps',
  position: 'position',
  UserId: 1,
  AlbumId: 1
});

actions.push({
  content: '这是一条即将被删除的动态。',
  gps: 'gps',
  position: 'position',
  UserId: 1,
  AlbumId: 2
});

actions.push({
  content: '这是一条搞笑动态。',
  gps: 'gps',
  position: 'position',
  UserId: 1,
  AlbumId: 2
});

actions.push({
  content: '这是一条搞笑动态。',
  gps: 'gps',
  position: 'position',
  UserId: 1,
  AlbumId: 2
});

actions.push({
  content: '这是一条搞笑动态。',
  gps: 'gps',
  position: 'position',
  UserId: 1,
  AlbumId: 2
});

actions.push({
  content: '这是一条搞笑动态。',
  gps: 'gps',
  position: 'position',
  UserId: 1,
  AlbumId: 2
});

exports.fake = function*() {
  yield actions.map(function(action) {
    return db.models.Action.create(action);
  });
  debug('actions data fake finish.');
};

exports.fakeData = actions;