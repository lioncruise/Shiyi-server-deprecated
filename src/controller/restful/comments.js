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

  yield models.Album.update({
    commentsCount: sequelize.literal('commentsCount + 1'),
  }, {
    where:{
      id: this.request.body.AlbumId,
    },
  });
  yield models.Memory.update({
    commentsCount: sequelize.literal('commentsCount + 1'),
  }, {
    where:{
      id: this.request.body.MemoryId,
    },
  });

  this.body = comment.toJSON();

  //在返回的信息中加入User信息
  if (this.query.isWithUser === 'true') {
    const user = yield models.User.find({
      paranoid: true,
      where: {
        id: comment.UserId,
      },
    });
    this.body.User = user.toJSON();

    //如果是对评论评论，返回两个人的信息
    if (this.body.OrignalCommentId) {
      const originalComment = yield models.Comment.find({
        paranoid: true,
        where: {
          id: comment.OrignalCommentId,
        },
        include: [
          {
            model: models.User,
          },
        ],
      });
      this.body.OrignalComment = originalComment.toJSON();
      // 添加推送，推送给被评论人
      if (originalComment.User.getuiCid) {
        const template = config.getui.template.commentComment;
        yield utils.notification.sendNotificationToSingle(template.title, template.text, originalComment.User.getuiCid);
      }
    }
  }

  // 添加推送 评论 推送给记忆主人
  const memory = yield models.Memory.find({
    where: {
      id: this.request.body.MemoryId,
    },
    include: [
      { model: models.User },
    ]
  });

  if(memory.User.getuiCid){
    const template = config.getui.template.memoryComment;
    yield utils.notification.sendNotificationToSingle(template.title, template.text, memory.User.getuiCid);
  }


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
    return;
  }

  yield models.Comment.update({
    OrignalCommentId: null,
  }, {
    where: {
      OrignalCommentId: this.params.id,
    },
  });

  //冗余数据-1
  yield models.Memory.update({
    commentsCount: sequelize.literal('commentsCount - 1'),
  }, {
    where: {
      id: comment.MemoryId,
    },
  });
  yield models.Album.update({
    commentsCount: sequelize.literal('commentsCount - 1'),
  }, {
    where: {
      id: comment.AlbumId,
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
