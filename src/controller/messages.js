'use strict';

const router = require('../router').router;
const models = require('../db').models;

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
  yield models.Message.destroy({
    where: {
      TargetUserId: this.session.user.id,
    },
  });
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
  yield models.Message.destroy({
    where: {
      id: {
        $in: this.body.map((message) => message.id),
      },
    },
  });
});
