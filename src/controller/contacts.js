'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');
const moment = require('moment');
const sequelize = require('sequelize');

router.post('/getUsersByPhones', function*() {
  this.verifyParams({
    names: {
      required: true,
      type: 'array',
      itemType: 'string',
    },
    phones: {
      required: true,
      type: 'array',
      itemType: 'string',
    },
  }, this.request.body);

  const contacts = [];
  const len = this.request.body.names.length < this.request.body.phones.length ? this.request.body.names.length : this.request.body.phones.length;
  for (let i = 0; i < len; i++) {
    contacts.push({
      name: this.request.body.names[i],
      phone: this.request.body.phones[i],
    });
  }

  const phoneNameMap = new Map();
  const phones = contacts.map(function(contact) {
    phoneNameMap.set(contact.phone, contact.name);
    return contact.phone;
  });

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

    // 3:互相关注 2:对方关注我 1:我关注对方 0:互不关注 //字符串类型
    user.relation = '' + user.relation;
    _this.body.push(user);
  });
});
