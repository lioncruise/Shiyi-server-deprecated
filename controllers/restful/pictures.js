'use strict';

var models = require('../../db').models;
var utils = require('../../utils');
var copy = require('copy-to');

exports.show = function*() {
  this.verifyParams({
    id: 'id'
  });
  var picture = yield models.Picture.find({
    where: {
      id: this.params.id,
      isBlocked: false,
      isDeleted: false
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
    pictureUrl: 'url',
    AlbumId: 'id',
    ActionId: 'id'
  });

  var picture = models.Picture.build(this.request.body);
  picture.UserId = this.session.user.id;
  picture = yield picture.save();

  this.body = picture.toJSON();
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id'
  });

  var picture = yield models.Picture.find({
    where: {
      id: this.params.id,
      isBlocked: false,
      UserId: this.session.user.id,
      isDeleted: false
    }
  });

  if (!picture) {
    return this.body = {
      statusCode: 404,
      message: '图片不存在'
    };
  }

  picture = yield picture.updateAttributes({
    isDeleted: true
  });

  this.body = picture.toJSON();
};