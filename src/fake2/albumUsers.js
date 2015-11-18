'use strict';

var db = require('../src/db');
var debug = require('debug')('fake/albumUsers');
var utility = require('utility');

var albumUsers = [];

albumUsers.push({
  AlbumId: 1,
  UserId: 2
});

albumUsers.push({
  AlbumId: 1,
  UserId: 3
});

albumUsers.push({
  AlbumId: 1,
  UserId: 4
});

albumUsers.push({
  AlbumId: 1,
  UserId: 5
});

albumUsers.push({
  AlbumId: 1,
  UserId: 6
});


exports.fake = function*() {
  yield albumUsers.map(function(albumUser) {
    return db.models.AlbumUser.create(albumUser);
  });
  debug('albumUsers data fake finish.');
};

exports.fakeData = albumUsers;