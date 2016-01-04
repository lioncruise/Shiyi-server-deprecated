'use strict';

const router = require('../router').router;
const models = require('../db').models;
const modelUtils = require('../db/modelUtils');
const userCodeCache = require('../cache').userCodeCache;
const userSecCodeCache = require('../cache').userSecCodeCache;
const jwt = require('jsonwebtoken');
const config = require('../config');
const redisToken = require('../utils').redisToken;
const urllib = require('urllib');

//验证手机号
router.post('/verifyPhone', function*() {
  this.verifyParams({
    phone: modelUtils.phoneRegExp,
    secCode: 'string',
  });

  //向mob验证验证
  let result = {
    data: {
      status: 200,
    },
  };
  if (process.env.NODE_ENV === 'production') {
    result = yield urllib.requestThunk('https://webapi.sms.mob.com/sms/verify', {
      method: 'POST',
      data: {
        appkey: config.mob.appKey,
        phone: this.request.body.phone,
        zone: '86',
        code: this.request.body.secCode,
      },
      dataType: 'json',
    });
  }

  if (result.data.status === 200) {
    userSecCodeCache.set(this.request.body.phone, true);
  } else {
    this.body = {
      statusCode: result.data.status,
      data: {
        status: false,
      },
      message: '验证码错误',
    };
    return;
  }

  this.body = {
    status: true,
  };
});

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
      required: true,
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

  if (!userSecCodeCache.has(this.request.body.phone)) {
    this.body = {
      statusCode: 409,
      message: '手机号未验证',
    };
    return;
  }

  userSecCodeCache.del(this.request.body.phone);

  let user;
  try {
    user = yield models.User.create(this.request.body);
  } catch (e) {
    this.body = {
      statusCode: 409,
      message: '用户已存在',
    };
    return;
  }

  this.body = user.toJSON();

  // 生成用于验证token用户登录唯一性
  let tokenVerify = redisToken.verifyCode();

  this.body.token = jwt.sign({
    user: {
      id: user.id,
      tokenVerify,
    },
  }, config.tokenKey);

  redisToken.save(user.id, this.body.token);

  //新建用户后建立用户默认相册
  yield models.Album.create({
    UserId: user.id,
    title: '默认相册',
    description: '默认相册',
    isPublic: 'shared',
    allowComment: 'collaborators',
  });
});

//忘记密码
router.post('/changePassword', function*() {
  this.verifyParams({
    phone: modelUtils.phoneRegExp,
    newPassword: {
      type: 'password',
      required: true,
      allowEmpty: false,
    },
  });

  let user = yield models.User.find({
    paranoid: true,
    where: {
      phone: this.request.body.phone,
    },
  });
  if (!user) {
    this.body = {
      statusCode: 404,
      message: '用户未注册',
    };
    return;
  }

  if (!userSecCodeCache.has(this.request.body.phone)) {
    this.body = {
      statusCode: 409,
      message: '手机号未验证',
    };
    return;
  }

  userSecCodeCache.del(this.request.body.phone);

  yield user.update({
    password: this.request.body.newPassword,
  });

  this.body = user.toJSON();

  redisToken.remove(user.id);
});

//登录
router.post('/login', function*() {
  this.verifyParams({
    phone: modelUtils.phoneRegExp,
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
    this.body = {
      statusCode: 404,
      message: '用户名或密码错误',
    };
    return;
  }

  yield user.update({
    ip: this.ip,
  });

  this.body = user.toJSON();

  // 生成用于验证token用户登录唯一性
  let tokenVerify = redisToken.verifyCode();

  this.body.token = jwt.sign({
    user: {
      id: user.id,
      tokenVerify,
    },
  }, config.tokenKey);

  redisToken.save(user.id, this.body.token);
});

//PC端扫码登录
router.post('/pcLogin', function*() {
  const key = this.query.key;
  userCodeCache.set(key, this.session.user.id);
});

//PC端服务器查找用户
router.get('/getUserIdByKey', function*() {
  const key = this.query.key;
  if (userCodeCache.has(key)) {
    this.body = {
      UserId: userCodeCache.peek(key),
      isLogin: true,
    };
  } else {
    this.body = {
      UserId: null,
      isLogin: false,
    };
  }
});

//登出
router.get('/logout', function*() {
  redisToken.remove(this.session.user.id);
  this.body = {};
});

//更新个人信息
//这个接口不能更新phone
router.put('/update', function*() {
  this.verifyParams({
    phone: {
      type: 'string',
      required: false,
      allowEmpty: false,
      format: modelUtils.phoneRegExp,
    },
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
    avatarStoreKey: {
      type: 'string',
      required: false,
    },
    getuiCid: {
      type: 'string',
      required: false,
    },
  });

  const user = yield models.User.find({
    paranoid: true,
    where: {
      id: this.session.user.id,
    },
  });
  yield user.update(this.request.body);
  this.body = user.toJSON();
});
