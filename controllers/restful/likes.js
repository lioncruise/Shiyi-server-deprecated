'use strict';

var models = require('../../db').models;
var utils = require('../../utils');
var copy = require('copy-to');

exports.show = function*() {
  this.verifyParams({
    id: 'id'
  });
  var like = yield models.Like.find({
    where: {
      id: this.params.id
    },
    include: [{
      model: models.User
    }, {
      model: models.Picture,
      include: [{
        model: models.User
      }]
    }, {
      model: models.Action
    }]
  });

  if (!like) {
    return this.body = {
      statusCode: 404,
      message: '点赞不存在'
    };
  }

  this.body = like.toJSON();
};

exports.create = function*() {
  this.verifyParams({
    type: 'string',
    PictureId: {
      type: 'id',
      required: false,
      allowEmpty: false
    },
    ActionId: {
      type: 'id',
      required: false,
      allowEmpty: false
    }
  });

  var like = models.Like.build(this.request.body);
  like.UserId = this.session.user.id;
  like = yield like.save();

  this.body = like.toJSON();
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id'
  });

  var like = yield models.Like.find({
    where: {
      id: this.params.id,
      UserId: this.session.user.id
    }
  });

  if (!like) {
    return this.body = {
      statusCode: 404,
      message: '点赞不存在'
    };
  }

  yield like.destroy();

  this.body = {
    statusCode: 200
  };
};