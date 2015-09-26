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

module.exports = function*() {
  yield actions.map(function(action) {
    return db.models.Action.create(action);
  });
  debug('actions data fake finish.');
};

module.exports.fakeActions = actions;