'use strict';

var router = require('../router').router;
var models = require('../db').models;
var chance = require('chance').Chance();
var debug = require('debug')('controllers/login');
var utils = require('../utils');

var chanceOption = {
  length: 4,
  pool: '0123456789'
};

var sendMessage = function*(phone, code) {
  //TODO: 发送短信验证码
  debug('Security code [%s] has sent to phone [%s].', code, phone);
};

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
  } catch(e) {
    this.body = {
      statusCode: 409,
      message: '用户已存在'
    };
  }
});