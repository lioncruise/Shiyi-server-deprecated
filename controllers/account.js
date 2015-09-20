'use strict';

var router = require('../router').router;
var models = require('../db').models;
var chance = require('chance').Chance();
var debug = require('debug')('controllers/account');
var utils = require('../utils');

var chanceOption = {
  length: 4,
  pool: '0123456789'
};

var sendMessage = function*(phone, code) {
  //TODO: 发送短信验证码
  debug('Security code [%s] has sent to phone [%s].', code, phone);
};

//发送验证码
router.post('/getSeccode', function*() {
  this.verifyParams({
    phone: utils.phoneRegExp
  });

  var existUser = yield models.User.find({
    where: {
      phone: this.request.body.phone
    }
  });
  if (existUser) {
    return this.body = {
      statusCode: 409,
      message: '用户已存在'
    };
  }

  var seccode = chance.string(chanceOption);

  yield sendMessage(this.request.body.phone, seccode);

  this.body = {
    phone: this.request.body.phone,
    seccode: seccode
  };
});

//注册
router.post('/register', function*() {
  this.verifyParams({
    phone: utils.phoneRegExp,
    password: {
      type: 'password',
      required: true,
      allowEmpty: false,
      min: 6
    },
    gender: ['M', 'F'],
    motto: {
      type: 'string',
      required: true,
      allowEmpty: true
    }
  });

  //TODO: 头像处理

  try {
    var user = yield models.User.build({
      phone: this.request.body.phone,
      password: this.request.body.password,
      gender: this.request.body.gender,
      motto: this.request.body.motto
    }).save();

    this.body = utils.cloneJson(user);
  } catch (e) {
    this.body = {
      statusCode: 409,
      message: '用户已存在'
    };
  }
});

//登录
router.post('/login', function*() {
  this.verifyParams({
    phone: utils.phoneRegExp,
    password: {
      type: 'password',
      required: true,
      allowEmpty: false,
      min: 6
    }
  });

  var user = yield models.User.find({
    where: {
      phone: this.request.body.phone,
      password: this.request.body.password,
      isBlocked: false
    }
  });
  if (!user) {
    return this.body = {
      statusCode: 404,
      message: '用户名或密码错误'
    };
  }

  this.session = {
    user: utils.cloneJson(user)
  };

  this.body = utils.cloneJson(user);
});

//登出
router.post('/logout', function*() {
  this.session = null;
  this.body = {};
});

//更新个人信息
router.put('/update', function*() {
  var user = yield models.User.find({
    where: {
      id: this.session.user.id,
      isBlocked: false
    }
  });

  if (!user) {
    return this.body = {
      statusCode: 404,
      message: '用户不存在'
    };
  }

  if(this.request && this.request.body) {
    if(this.request.body.nickname) {
      user.nickname = String(this.request.body.nickname);
    }
    if(this.request.body.motto) {
      user.motto = String(this.request.body.motto);
    }
    if(this.request.body.birthday) {
      user.birthday = String(this.request.body.birthday);
    }
    if(this.request.body.gender) {
      user.gender = String(this.request.body.gender);
    }
    if(this.request.body.hometown) {
      user.hometown = String(this.request.body.hometown);
    }
  }
  yield user.save();

  this.body = utils.cloneJson(user);
});