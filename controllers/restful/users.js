'use strict';

var models = require('../../db').models;
var utils = require('../../utils');

exports.show = function*() {
  var user = yield models.User.find({
    where: {
      id: this.params.id,
      isBlocked: false
    }
  });

  if (!user) {
    return this.body = {
      statusCode: 404,
      message: '用户不存在'
    };
  }

  this.body = utils.cloneJson(user);
};