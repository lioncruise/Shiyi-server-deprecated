'use strict';

const models = require('../../db').models;
const utils = require('../../utils');

exports.show = function*() {
  this.verifyParams({
    id: 'id',
    isWithUsersInfo: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
  });

  const include = [];

  if (this.query.isWithUsersInfo === 'true') {
    include.push({
      model: models.User,
    }, {
      model: models.User,
      as: 'TargetUser',
    });
  }

  const message = yield models.Message.find({
    where: {
      id: this.params.id,
    },
    include,
  });

  if (!message) {
    this.body = {
      statusCode: 404,
      message: '消息不存在',
    };
    return;
  }

  this.body = message.toJSON();
};

exports.create = function*() {
  this.verifyParams({
    content: {
      type: 'string',
      required: true,
      allowEmpty: true,
    },
    TargetUserId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
  });

  const message = yield models.Message.create(Object.assign(this.request.body, {
    type: 'message',
    UserId: this.session.user.id,
  }));

  this.body = message.toJSON();
};
