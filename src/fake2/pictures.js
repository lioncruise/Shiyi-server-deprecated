'use strict';

var db = require('../src/db');
var debug = require('debug')('fake/pictures');

var pictures = [];

pictures.push({
  pictureKey: 'adg1',
  AlbumId: 1,
  ActionId: 1,
  UserId: 1
});

pictures.push({
  pictureKey: 'adg2',
  AlbumId: 1,
  ActionId: 1,
  UserId: 1
});

pictures.push({
  pictureKey: 'adg3',
  AlbumId: 1,
  ActionId: 1,
  UserId: 1
});

pictures.push({
  pictureKey: 'adg4',
  AlbumId: 1,
  ActionId: 2,
  UserId: 1
});

pictures.push({
  pictureKey: 'adg5',
  AlbumId: 1,
  ActionId: 2,
  UserId: 1
});

pictures.push({
  pictureKey: 'adg6',
  AlbumId: 1,
  ActionId: 2,
  UserId: 1
});

exports.fake = function*() {
  yield pictures.map(function(picture) {
    return db.models.Picture.create(picture);
  });
  debug('pictures data fake finish.');
};

exports.fakeData = pictures;