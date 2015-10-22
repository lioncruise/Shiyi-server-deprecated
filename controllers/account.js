'use strict';

var router = require('../router').router;
var models = require('../db').models;
var chance = require('chance').Chance();
var debug = require('debug')('controllers/account');
var utils = require('../utils');
var middlewares = require('../middlewares');
var utility = require('utility');
var moment = require('moment');

var chanceOption = {
  length: 4,
  pool: '0123456789'
};

//发送验证码
router.post('/getSeccode', function*() {
  this.verifyParams({
    phone: utils.phoneRegExp,
    type: ['register', 'changePassword']
  });

  var existUser = yield models.User.find({
    where: {
      phone: this.request.body.phone
    }
  });

  debug('existUser: ' + existUser);

  if (this.request.body.type === 'register' && existUser) {
    debug('register: 用户已存在');
    return this.body = {
      statusCode: 409,
      message: '用户已存在'
    };
  }
  if (this.request.body.type === 'changePassword' && !existUser) {
    debug('changePassword: 用户不存在');
    return this.body = {
      statusCode: 409,
      message: '用户不存在'
    };
  }

  var seccode = chance.string(chanceOption);

  yield utils.sendSMS(this.request.body.phone, seccode);

  var token = yield models.Token.create({
    phone: this.request.body.phone,
    token: utility.md5(moment().format()),
    type: this.request.body.type
  });

  this.body = {
    phone: this.request.body.phone,
    seccode: seccode,
    token: token.token
  };
});

//忘记密码
router.post('/changePassword', function*() {
  this.verifyParams({
    phone: utils.phoneRegExp,
    token: 'string',
    password: {
      type: 'password',
      required: true,
      allowEmpty: false
    }
  });

  var _result = yield models.Token.destroy({
    where: {
      phone: this.request.body.phone,
      token: this.request.body.token,
      type: 'changePassword'
    }
  });

  if (_result === 0) {
    return this.body = {
      statusCode: 422,
      message: 'Token错误'
    };
  }

  _result = yield models.User.update({
    password: this.request.body.password
  }, {
    where: {
      phone: this.request.body.phone
    }
  });

  if (_result[0] === 0) {
    return this.body = {
      statusCode: 404,
      message: '无密码修改'
    };
  }

  this.body = {
    statusCode: 200
  };
});

//注册
router.post('/register', function*() {
  this.verifyParams({
    phone: utils.phoneRegExp,
    nickname: 'string',
    token: 'string',
    password: {
      type: 'password',
      required: true,
      allowEmpty: false
    },
    gender: ['M', 'F'],
    motto: {
      type: 'string',
      required: true,
      allowEmpty: true,
      max: 50
    }
  });

  var _result = yield models.Token.destroy({
    where: {
      phone: this.request.body.phone,
      token: this.request.body.token,
      type: 'register'
    }
  });

  if (_result === 0) {
    return this.body = {
      statusCode: 422,
      message: 'Token错误'
    };
  }

  try {
    var user = yield models.User.create({
      phone: this.request.body.phone,
      password: this.request.body.password,
      gender: this.request.body.gender,
      motto: this.request.body.motto,
      nickname: this.request.body.nickname
    });

    this.body = utils.cloneJson(user);
    this.session = {
      user: user.toJSON()
    };

    //新建用户后建立用户默认相册
    yield models.Album.create({
      UserId: user.id,
      title: '默认相册',
      description: '默认相册',
      isShare: false,
      isPublic: false,
      isShowRawInfo: true,
      allowLike: true,
      allowComment: true
    });

    this.body.ownAlbums = yield user.getOwnAlbums();

    for (var i = 0; i < this.body.ownAlbums.length; i++) {
      this.body.ownAlbums[i].pictureCount = 0;
    }
  } catch (e) {
    debug('register_error: ' + e);
    this.body = {
      statusCode: 409,
      message: '用户已存在'
    };
    this.session = null;
  }
});

//登录
router.post('/login', function*() {
  this.verifyParams({
    phone: utils.phoneRegExp,
    password: {
      type: 'password',
      required: true,
      allowEmpty: false
    }
  });

  var user = yield models.User.find({
    paranoid: true,
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
    user: user.toJSON()
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
      min: 2,
      max: 10
    },
    password: {
      type: 'password',
      required: false,
      allowEmpty: false
    },
    motto: {
      type: 'string',
      required: false,
      allowEmpty: true,
      max: 50
    },
    gender: {
      type: 'enum',
      values: ['M', 'F'],
      required: false,
      allowEmpty: false
    },
    birthday: {
      type: 'string',
      required: false
    },
    hometown: {
      type: 'string',
      required: false
    }
  });

  var user = yield models.User.find({
    paranoid: true,
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

  if (this.request && this.request.body) {
    if (this.request.body.nickname) {
      user.nickname = String(this.request.body.nickname);
    }
    if (this.request.body.password) {
      user.password = String(this.request.body.password);
    }
    if (this.request.body.motto) {
      user.motto = String(this.request.body.motto);
    }
    if (this.request.body.birthday) {
      user.birthday = String(this.request.body.birthday);
    }
    if (this.request.body.gender) {
      user.gender = String(this.request.body.gender);
    }
    if (this.request.body.hometown) {
      user.hometown = String(this.request.body.hometown);
    }
    yield user.save();
  }

  this.body = user.toJSON();
});