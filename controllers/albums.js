'use strict';

var router = require('../router').router;
var models = require('../db').models;
var chance = require('chance').Chance();
var debug = require('debug')('controllers/albums');
var utils = require('../utils');
var middlewares = require('../middlewares');
var utility = require('utility');
var moment = require('moment');

//获取自己的相册
router.get('/getOwnAlbums', function*() {
  var userId = parseInt(this.query.userId) ? parseInt(this.query.userId) : this.session.user.id;
  var user = yield models.User.find({
    where: {
      id: userId
    }
  });

  if (!user) {
    return this.body = {
      statusCode: 404,
      message: '用户不存在'
    };
  }

  var albums = yield user.getOwnAlbums();

  yield(albums.map(function(album) {
    return album.getRelatedInfo();
  }));

  this.body = albums.map(function(album) {
    return album.toJSONwithAttributes();
  });
});

//获取自己加入的相册
router.get('/getRelatedAlbums', function*() {
  var userId = parseInt(this.query.userId) ? parseInt(this.query.userId) : this.session.user.id;
  var user = yield models.User.find({
    where: {
      id: userId
    }
  });

  if (!user) {
    return this.body = {
      statusCode: 404,
      message: '用户不存在'
    };
  }

  var albums = yield user.getRelatedAlbums();

  yield(albums.map(function(album) {
    return album.getRelatedInfo();
  }));

  this.body = albums.map(function(album) {
    return album.toJSONwithAttributes();
  });
});