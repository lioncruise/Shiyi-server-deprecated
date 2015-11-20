'use strict';

var models = require('../../db').models;
var utils = require('../../utils');
var copy = require('copy-to');
var messageController = require('./messages');

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

  var requestBody = this.request.body;
  var types = [{
    model: 'Picture',
    id: 'PictureId'
  }, {
    model: 'Action',
    id: 'ActionId'
  }];
  var typeId = requestBody.PictureId ? 0 : 1;
  var currentType = types[typeId];

  var target = yield models[currentType.model].find({
    where: {
      id: this.request.body[currentType.id]
    }
  });

  if (!target) {
    return this.body = {
      statusCode: 404,
      message: '点赞对象不存在'
    };
  }

  var like = models.Like.build(this.request.body);
  like.UserId = this.session.user.id;
  like = yield like.save();

  //添加新的Message
  yield messageController.createMessage(null, 'L', this.session.user.id, target.UserId, like.id, null);

  this.body = like.toJSON();
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id'
  });

  var _result = yield models.Like.destroy({
    where: {
      id: this.params.id,
      UserId: this.session.user.id
    }
  });

  if (_result === 0) {
    return this.body = {
      statusCode: 404,
      message: '点赞不存在'
    };
  }
};
