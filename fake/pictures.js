'use strict';

var db = require('../db');
var debug = require('debug')('fake/pictures');

var pictures = [];

pictures.push({
  pictureKey: 'http://test.com/1',
  AlbumId: 1,
  ActionId: 1,
  UserId: 1
});

pictures.push({
  pictureKey: 'http://test.com/2',
  AlbumId: 1,
  ActionId: 1,
  UserId: 1
});

pictures.push({
  pictureKey: 'http://test.com/3',
  AlbumId: 1,
  ActionId: 1,
  UserId: 1
});

pictures.push({
  pictureKey: 'http://test.com/4',
  AlbumId: 1,
  ActionId: 2,
  UserId: 1
});

pictures.push({
  pictureKey: 'http://test.com/5',
  AlbumId: 1,
  ActionId: 2,
  UserId: 1
});

pictures.push({
  pictureKey: 'http://test.com/6',
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