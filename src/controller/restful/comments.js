'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const sequelize = require('sequelize');

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

  const comment = yield models.Comment.find({
    paranoid: true,
    where: {
      id: this.params.id,
    },
    include,
  });

  if (!comment) {
    this.body = {
      statusCode: 404,
      message: '评论不存在',
    };
    return;
  }

  this.body = comment.toJSON();
};

exports.create = function*() {
  this.verifyParams({
    content: 'string',
    MemoryId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
    OrignalCommentId: {
      type: 'id',
      required: false,
      allowEmpty: false,
    },
    AlbumId: {
      type: 'id',
      required: true,
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

  const comment = yield models.Comment.find({
    paranoid: true,
    where: {
      id: this.params.id,
    },
  });

  if (!comment) {
    this.body = {
      statusCode: 404,
      message: '删除失败',
    };
  }

  yield models.Comment.update({
    OrignalCommentId: null,
  }, {
    where: {
      OrignalCommentId: this.params.id,
    },
  });

  yield models.Memory.update({
    commentsCount: sequelize.col('commentsCount') - 1,
  }, {
    where: {
      id: comment.MemoryId,
    },
  });

  const result = yield models.Comment.destroy({
    where: {
      id: this.params.id,
      UserId: this.session.user.id,
    },
  });

  if (result === 0) {
    this.body = {
      statusCode: 404,
      message: '删除失败',
    };
  }
};
