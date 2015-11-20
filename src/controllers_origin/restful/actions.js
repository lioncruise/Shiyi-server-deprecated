'use strict';

var models = require('../../db').models;
var utils = require('../../utils');
var copy = require('copy-to');

exports.show = function*() {
  this.verifyParams({
    id: 'id'
  });
  var action = yield models.Action.find({
    paranoid: true,
    where: {
      id: this.params.id,
      isBlocked: false
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

  var _result = yield models.Action.destroy({
    where: {
      id: this.params.id,
      isBlocked: false,
      UserId: this.session.user.id
    }
  });

  if(_result === 0) {
    return this.body = {
      statusCode: 404,
      message: '动态不存在'
    };
  }
};