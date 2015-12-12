'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const sequelize = require('sequelize');

exports.create = function*() {
  this.verifyParams({
    type: 'string',
    MemoryId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
    AlbumId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
  });

  const like = yield models.Like.create(Object.assign(this.request.body, {
    UserId: this.session.user.id,
  }));

  this.body = like.toJSON();
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id',
  });

  const like = yield models.Like.find({
    paranoid: true,
    where: {
      id: this.params.id,
    },
  });

  if (!like) {
    this.body = {
      statusCode: 404,
      message: '删除失败',
    };
  }

  yield models.Memory.update({
    likesCount: sequelize.col('likesCount') - 1,
  }, {
    where: {
      id: like.MemoryId,
    },
  });

  const result = yield models.Like.destroy({
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
