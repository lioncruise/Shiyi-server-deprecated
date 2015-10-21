'use strict';

var models = require('../../db').models;
var utils = require('../../utils');
var copy = require('copy-to');
var messageController = require('./messages');

exports.show = function*() {
  this.verifyParams({
    id: 'id'
  });
  var comment = yield models.Comment.find({
    paranoid: true,
    where: {
      id: this.params.id,
      isBlocked: false
    },
    include: [{
      model: models.User
    }, {
      model: models.Picture
    }, {
      model: models.Action
    }, {
      model: models.Comment,
      as: 'OrignalComment',
      include: [{
        model: models.User
      }]
    }]
  });

  if (!comment) {
    return this.body = {
      statusCode: 404,
      message: '评论不存在'
    };
  }

  this.body = comment.toJSON();
};

exports.create = function*() {
  this.verifyParams({
    content: 'string',
    PictureId: {
      type: 'id',
      required: false,
      allowEmpty: false
    },
    ActionId: {
      type: 'id',
      required: false,
      allowEmpty: false
    },
    OrignalCommentId: {
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
  }, {
    model: 'Comment',
    id: 'OrignalCommentId'
  }];
  var typeId = requestBody.PictureId ? 0 : (requestBody.ActionId ? 1 : 2);
  var currentType = types[typeId];

  var target = yield models[currentType.model].find({
    where: {
      id: this.request.body[currentType.id]
    }
  });

  if (!target) {
    return this.body = {
      statusCode: 404,
      message: '评论对象不存在'
    };
  }

  var comment = models.Comment.build(this.request.body);
  comment.UserId = this.session.user.id;
  comment = yield comment.save();

  //添加新的Message
  yield messageController.createMessage(null, 'C', this.session.user.id, target.UserId, null, comment.id);

  this.body = comment.toJSON();
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id'
  });

  var _result = yield models.Comment.destroy({
    where: {
      id: this.params.id,
      isBlocked: false,
      UserId: this.session.user.id
    }
  });

  if (_result === 0) {
    return this.body = {
      statusCode: 404,
      message: '评论不存在'
    };
  }
};