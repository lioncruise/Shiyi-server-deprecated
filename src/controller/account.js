'use strict';

const router = require('../router').router;
const models = require('../db').models;
const chance = require('chance').Chance();
const debug = require('debug')('controllers/account');
const utils = require('../utils');
const utility = require('utility');
const moment = require('moment');
const modelUtils = require('../db/modelUtils');

const chanceOption = {
  length: 4,
  pool: '0123456789',
};

//注册
router.post('/register', function*() {
  this.verifyParams({
    phone: modelUtils.phoneRegExp,
    nickname: 'string',
    password: {
      type: 'password',
      required: true,
      allowEmpty: false,
    },
    gender: {
      type: 'enum',
      values: ['M', 'F'],
      required: false,
      allowEmpty: false,
    },
    motto: {
      type: 'string',
      required: true,
      allowEmpty: true,
      max: 100,
    },
    avatarStoreKey: {
      type: 'string',
      required: false,
      allowEmpty: true,
    },
  });

  let user;
  try {
    user = yield models.User.create(this.request.body);
  } catch (e) {
    return this.body = {
      statusCode: 409,
      message: '用户已存在',
    };
  }

  this.body = user.toJSON();
  this.session = {
    user: user.toJSON(),
  };

  //新建用户后建立用户默认相册
  yield models.Album.create({
    UserId: user.id,
    title: '默认相册',
    description: '默认相册',
    isPublic: 'shared',
    allowComment: 'collaborators',
  });
});

//登录
router.post('/login', function*() {
  this.verifyParams({
    phone: utils.phoneRegExp,
    password: {
      type: 'password',
      required: true,
      allowEmpty: false,
    },
  });

  const user = yield models.User.find({
    paranoid: true,
    where: {
      phone: this.request.body.phone,
      password: this.request.body.password,
    },
  });
  if (!user) {
    return this.body = {
      statusCode: 404,
      message: '用户名或密码错误',
    };
  }

  this.session = {
    user: user.toJSON(),
  };
  this.body = user.toJSON();
});

//登出
router.get('/logout', function*() {
  this.session = null;
  this.body = {};
});

//更新个人信息
router.put('/update', function*() {
  this.verifyParams({
    nickname: {
      type: 'string',
      required: false,
      allowEmpty: false,
      min: 1,
      max: 20,
    },
    password: {
      type: 'password',
      required: false,
      allowEmpty: false,
    },
    gender: {
      type: 'enum',
      values: ['M', 'F'],
      required: false,
      allowEmpty: false,
    },
    birthday: {
      type: 'string',
      required: false,
    },
    hometown: {
      type: 'string',
      required: false,
      allowEmpty: false,
    },
    motto: {
      type: 'string',
      required: false,
      allowEmpty: true,
      max: 100,
    },
  });

  yield models.User.update(this.request.body, {
    where: {
      id: this.session.user.id,
    },
  });
});
