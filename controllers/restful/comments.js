'use strict';

var models = require('../../db').models;
var utils = require('../../utils');
var copy = require('copy-to');

exports.show = function*() {
  this.verifyParams({
    id: 'id'
  });
  var comment = yield models.Comment.find({
    where: {
      id: this.params.id
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

  var comment = models.Comment.build(this.request.body);
  comment.UserId = this.session.user.id;
  comment = yield comment.save();

  this.body = comment.toJSON();
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
  yield pictures.map(function(pic) {
    return pic.updateAttributes({
      isDeleted: true
    });
  });

  action = yield action.updateAttributes({
    isDeleted: true
  });

  this.body = action.toJSON();
};