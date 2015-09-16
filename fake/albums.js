'use strict';

var db = require('../db');
var debug = require('debug')('fake/albums');

var tags = [];

var albums = [];

albums.push({
  title: '爱情故事',
  description: '他与她的爱情',
  tag: '爱情,恋人',
  isShare: true,
  isPublic: true,
  isShowRawInfo: true,
  allowLike: true,
  allowComment: true,
  UserId: 1
});
tags.push('爱情', '恋人');

albums.push({
  title: '猫咪的一天',
  description: '可爱的猫咪如何度过他的一天',
  tag: '猫,动物,萌',
  isShare: true,
  isPublic: true,
  isShowRawInfo: true,
  allowLike: true,
  allowComment: true,
  UserId: 2
});
tags.push('猫', '动物', '萌');

var insertTagsArray = tags.map(function (tag) {
  return db.models.Tag.create({
    name: tag
  });
});

var insertAlbumsArray = albums.map(function (album) {
  return function*() {
    var _a = yield db.models.Album.create(album);
    var _t = yield db.models.Tag.findAll({
      where: {
        name: {
          in: album.tag.split(',')
        }
      }
    });

    _a.setTags(_t);

    yield _a.save();
  };
});

module.exports = function*() {
  yield insertTagsArray;
  debug('tags data fake finish.');
  yield insertAlbumsArray;
  debug('albums data fake finish.');
};