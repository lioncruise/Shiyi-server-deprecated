'use strict';

var models = require('../../db').models;
var utils = require('../../utils');
var copy = require('copy-to');

exports.show = function*() {
  this.verifyParams({
    id: 'id'
  });
  var action = yield models.Action.find({
    where: {
      id: this.params.id,
      isBlocked: false,
      isDeleted: false
    },
    include: [{
      model: models.Picture
    }, {
      model: models.Album
    }, {
      model: models.User
    }, {
      model: models.Like,
      include: [{
        model: models.User
      }]
    }]
  });

  if (!action) {
    return this.body = {
      statusCode: 404,
      message: '动态不存在'
    };
  }

  this.body = action.toJSON();
  this.body.Album.pictureCount = yield models.Picture.getPictureCountByAlbumId(this.body.Album.id);
  this.body.likeCount = yield models.Like.getLikeCountByActionId(this.body.id);
};

exports.create = function*() {
  this.verifyParams({
    content: {
      type: 'string',
      required: true,
      allowEmpty: true
    },
    gps: {
      type: 'string',
      required: true,
      allowEmpty: true
    },
    position: {
      type: 'string',
      required: true,
      allowEmpty: true
    }
  });

  var action = models.Action.build(this.request.body);
  action.UserId = this.session.user.id;
  action = yield action.save();

  this.body = action.toJSON();
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id'
  });

  var action = yield models.Action.find({
    where: {
      id: this.params.id,
      isBlocked: false,
      UserId: this.session.user.id,
      isDeleted: false
    }
  });

  if (!action) {
    return this.body = {
      statusCode: 404,
      message: '动态不存在'
    };
  }

  //删除动态的同时，删除一同上传的照片
  var pictures = yield action.getPictures();
  yield pictures.map(function (pic) {
    return pic.updateAttributes({
      isDeleted: true
    });
  });

  action = yield action.updateAttributes({
    isDeleted: true
  });

  this.body = action.toJSON();
};