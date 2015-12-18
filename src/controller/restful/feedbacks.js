'use strict';

const models = require('../../db').models;
const utils = require('../../utils');

// 返回一个人的所有反馈
exports.index = function*() {
  const feedbacks = yield models.Feedback.findAll({
    where: {
      UserId: this.session.user.id,
    },
  });
  this.body = feedbacks.map((item) => item.toJSON());
};

exports.show = function*() {
  this.verifyParams({
    id: 'id',
  });
  const feedback = yield models.Feedback.find({
    where: {
      id: this.params.id,
    },
  });
  if (!feedback) {
    this.body = {
      statusCode: 404,
      message: '反馈不存在',
    };
    return;
  }

  this.body = feedback.toJSON();
};

exports.create = function*() {
  this.verifyParams({
    content: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
  });
  const feedback = yield models.Feedback.create(Object.assign(this.request.body, {
    UserId: this.session.user.id,
  }));
  this.body = feedback.toJSON();
};
