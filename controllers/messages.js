'use strict';

var router = require('../router').router;
var models = require('../db').models;
var debug = require('debug')('controllers/messages');
var utils = require('../utils');
var utility = require('utility');
var moment = require('moment');

//获取自己全部的未读消息
router.get('/getAllUnreadMessages', function*() {
  var messages = yield models.Message.findAll({
    where: {
      TargetUserId: this.session.user.id
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
      model: models.User
    }]
  });
  // message中不包含TargetUser信息，因为TargetUser都是接口请求者

  this.body = messages.map(function(message) {
    return message.toJSON();
  });

  //消息被提取之后删除
  yield models.Message.destroy({
    where: {
      TargetUserId: this.session.user.id
    }
  });
});