'use strict';

var models = require('../../db').models;
var utils = require('../../utils');
var copy = require('copy-to');

exports.show = function*() {
  this.verifyParams({
    id: 'id'
  });
  var picture = yield models.Picture.find({
    paranoid: true,
    where: {
      id: this.params.id,
      isBlocked: false
    },
    include: [{
      model: models.User
    }, {
      model: models.Comment,
      include: [{
        model: models.User
      }]
    }, {
      model: models.Like,
      include: [{
        model: models.User
      }]
    }]
  });

  if (!picture) {
    return this.body = {
      statusCode: 404,
      message: '图片不存在'
    };
  }

  this.body = picture.toJSON();
};

exports.create = function*() {
  this.verifyParams({
    pictureUrl: 'string',
    AlbumId: 'id',
    ActionId: 'id'
  });

  var picture = models.Picture.build(this.request.body);
  picture.UserId = this.session.user.id;
  picture = yield picture.save();

  this.body = picture.toJSON();

  //如果相册中无coverUrl，则把第一张图作为封面
  yield models.Album.update({
    coverUrl: this.request.body.pictureUrl
  }, {
    where: {
      id: this.request.body.AlbumId,
      coverUrl: null
    }
  });
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id'
  });

  var _result = yield models.Picture.destroy({
    where: {
      id: this.params.id,
      isBlocked: false,
      UserId: this.session.user.id
    }
  });

  if (_result === 0) {
    return this.body = {
      statusCode: 404,
      message: '图片不存在'
    };
  }
};