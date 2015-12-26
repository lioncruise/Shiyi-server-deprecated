'use strict';

const models = require('../../db').models;
const utils = require('../../utils');

exports.show = function*() {
  this.verifyParams({
    id: 'id',
  });

  const user = yield models.User.find({
    paranoid: true,
    where: {
      id: this.params.id,
    },
  });

  if (!user) {
    this.body = {
      statusCode: 404,
      message: '用户不存在',
    };
    return;
  }

  this.body = user.toJSON();
};
