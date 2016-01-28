'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');
const moment = require('moment');
const sequelize = require('sequelize');

router.post('/getUsersByPhones', function*() {
  this.verifyParams({
    namesString: {
      required: true,
      type: 'string',
    },
    phonesString: {
      required: true,
      type: 'string',
    },
  }, this.request.body);

  const names = this.request.body.namesString.split(',').filter(elm => elm !== '');
  const phones = this.request.body.phonesString.split(',').filter(elm => elm !== '');

  if (names.length !== phones.length) {
    this.body = {
      statusCode: '422',
      message: '数据错误',
    };
    return;
  }

  const contacts = [];
  const phoneNameMap = new Map();
  for (let i = 0; i < names.length; i++) {
    contacts.push({
      name: names[i],
      phone: phones[i],
    });
    phoneNameMap.set(phones[i], names[i]);
  }

  const users = yield models.User.findAll({
    paranoid: true,
    where: {
      phone: {
        $in: phones,
      },
    },
  });
  const idUserMap = new Map();
  users.forEach(function(user) {
    user = user.toJSON();
    user.relation = 0;
    idUserMap.set(user.id, user);
  });

  const AFollowB = yield models.UserUserFollow.findAll({
    where: {
      UserId: this.session.user.id,
      TargetUserId: {
        $in: phones,
      },
    },
  });
  AFollowB.forEach(function(elm) {
    const user = idUserMap.get(elm.TargetUserId);
    user.relation += 1;
    idUserMap.set(elm.TargetUserId, user);
  });

  const BFollowA = yield models.UserUserFollow.findAll({
    where: {
      UserId: {
        $in: phones,
      },
      TargetUserId: this.session.user.id,
    },
  });
  BFollowA.forEach(function(elm) {
    const user = idUserMap.get(elm.UserId);
    user.relation += 2;
    idUserMap.set(elm.UserId, user);
  });

  this.body = [];
  const _this = this;
  idUserMap.forEach(function(user, id) {
    user.name = phoneNameMap.get(user.phone);
    phoneNameMap.delete(user.phone);

    // 3:互相关注 2:对方关注我 1:我关注对方 0:互不关注 -1:未注册 //字符串类型
    user.relation = '' + user.relation;
    _this.body.push(user);
  });

  phoneNameMap.forEach(function(name, phone) {
    _this.body.push({
      name,
      phone,
      relation: '-1',
    });
  });
});
