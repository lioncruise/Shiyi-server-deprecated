'use strict';

const models = require('../../db').models;
const utils = require('../../utils');

exports.show = function*() {
  this.verifyParams({
    id: 'id',
    isWithUser: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
    isWithOrignalComment: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
  });

  const include = [];

  if (this.query.isWithUser === 'true') {
    include.push({
      model: models.User,
    });
  }

  if (this.query.isWithOrignalComment === 'true') {
    if (this.query.isWithUser === 'true') {
      include.push({
        model: models.Comment,
        as: 'OrignalComment',
        include: [{
          model: models.User,
        },
        ],
      });
    } else {
      include.push({
        model: models.Comment,
        as: 'OrignalComment',
      });
    }
  }

  var comment = yield models.Comment.find({
    paranoid: true,
    where: {
      id: this.params.id,
    },
    include,
  });

  if (!comment) {
    return this.body = {
      statusCode: 404,
      message: '评论不存在',
    };
  }

  this.body = comment.toJSON();
};

exports.create = function*() {
  this.verifyParams({
    content: 'string',
    ActionId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
    OrignalCommentId: {
      type: 'id',
      required: false,
      allowEmpty: false,
    },
  });

  const comment = yield models.Comment.create(Object.assign(this.request.body, {
    UserId: this.session.user.id,
  }));

  this.body = comment.toJSON();
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id',
  });

  //删除与评论相关的信息
  //TODO:

  const result = yield models.Comment.destroy({
    where: {
      id: this.params.id,
      UserId: this.session.user.id,
    },
  });

  if (result === 0) {
    return this.body = {
      statusCode: 404,
      message: '删除失败',
    };
  }
};
