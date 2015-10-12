'use strict';

var models = require('../../db').models;
var utils = require('../../utils');

exports.show = function*() {
  this.verifyParams({
    id: 'id'
  });

  var message = yield models.Message.find({
    where: {
      id: this.params.id
    },
    include: [{
      model: models.Comment,
      include: [{
        model: models.Comment,
        as: 'OrignalComment'
      }]
    }, {
      model: models.Like
    }, {
      model: models.User,
      as: 'TargetUser'
    }, {
      model: models.User
    }]
  });

  if (!message) {
    return this.body = {
      statusCode: 404,
      message: '消息不存在'
    };
  }

  this.body = message.toJSON();

  //消息被提取之后删除
  yield message.destroy();
};

//创建Message的内部接口
exports.createMessage = function*(content, type, UserId, TargetUserId, LikeId, CommentId) {
  return yield models.Message.create({
    content: content,
    type: type,
    UserId: UserId,
    TargetUserId: TargetUserId,
    LikeId: LikeId,
    CommentId: CommentId
  });
};