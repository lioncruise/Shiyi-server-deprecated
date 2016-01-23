'use strict';

const models = require('../../db').models;
const utils = require('../../utils');

exports.show = function*() {
  this.verifyParams({
    id: 'id',
    userId: {
      type: 'id',
      required: false,
      allowEmpty: false,
    },
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

  //添加用户与被查询用户之间关系
  const UserId = this.getUserIdByQueryAndSession(false);
  if (!UserId) {
    return; //对this.body无修改
  }

  const TargetUserId = this.params.id;

  const AFollowB = yield models.UserUserFollow.find({
    where: {
      UserId,
      TargetUserId,
    },
  });
  const BFollowA = yield models.UserUserFollow.find({
    where: {
      UserId: TargetUserId,
      TargetUserId: UserId,
    },
  });

  // 3:互相关注 2:B关注A 1:A关注B 0:互不关注 //字符串类型
  this.body.relationStatus = '' + ((AFollowB ? 1 : 0) + (BFollowA ? 2 : 0));
};
