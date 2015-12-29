'use strict';

const router = require('../router').router;
const models = require('../db').models;
const sequelize = require('sequelize');

//获取全部未读的信息的发送者，每个不同User返回一条，User里附带最近一条message信息
router.get('/getAllUnreadMessageSenders', function*() {
  const messages = yield models.Message.findAll({
    paranoid: true,
    attributes: [
      [sequelize.literal('DISTINCT `UserId`'), 'UserId'],
      'type',
      'content',
      'TargetUserId',
    ],
    where: {
      TargetUserId: this.session.user.id,
    },
  });
  const userIds = messages.map(elm => elm.UserId);

  const messagesMap = new Map();
  messages.forEach(message => messagesMap.set(message.UserId, message));

  const users = yield models.User.findAll({
    paranoid: true,
    where: {
      id: {
        $in: userIds,
      },
    },
  });

  this.body = users.map(function(user) {
    const obj = user.toJSON();
    obj.recentMessage = messagesMap.get(obj.id);
    return obj;
  });
});

//按UserId获取未读信息，和这个用户的互相message信息
router.get('/getAllUnreadMessagesWithOneUser', function*() {
  this.verifyParams({
    userId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
  }, this.query);

  const messages = yield models.Message.findAll({
    paranoid: true,
    where: {
      UserId: this.query.userId,
      TargetUserId: this.session.user.id,
    },
    order: [
      ['createdAt', 'DESC'],
    ],
  });

  this.body = messages;

  //消息被提取之后删除
  if (process.env.NODE_ENV === 'development') {
    yield models.Message.destroy({
      where: {
        UserId: this.query.userId,
        TargetUserId: this.session.user.id,
      },
    });
  }
});

//获取自己全部的未读消息
//message中不包含TargetUser信息，因为TargetUser都是接口请求者
router.get('/getAllUnreadMessages', function*() {
  const messages = yield models.Message.findAll({
    paranoid: true,
    where: {
      TargetUserId: this.session.user.id,
    },
    include: [{
      model: models.User,
    },
    ],
  });

  this.body = messages.map((message) => message.toJSON());

  //消息被提取之后删除
  if (process.env.NODE_ENV === 'development') {
    yield models.Message.destroy({
      where: {
        TargetUserId: this.session.user.id,
      },
    });
  }
});

//获取所有以往的Messages信息
router.get('/getAllMessages', function*() {
  this.verifyParams({
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

  const messages = yield models.Message.findAll({
    paranoid: false,
    where: {
      $or: [{
        TargetUserId: this.session.user.id,
      }, {
        UserId: this.session.user.id,
      },
      ],
    },
    include,
  });

  this.body = messages.map((message) => message.toJSON());

  //消息被提取之后删除
  if (process.env.NODE_ENV === 'development') {
    yield models.Message.destroy({
      where: {
        id: {
          $in: this.body.map((message) => message.id),
        },
      },
    });
  }
});
