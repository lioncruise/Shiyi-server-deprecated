'use strict';

const models = require('../../db').models;
const utils = require('../../utils');

exports.create = function*() {
  this.verifyParams({
    type: 'string',
    ActionId: {
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

  //删除与点赞相关的信息
  //TODO:

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
