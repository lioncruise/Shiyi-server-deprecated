'use strict';

const router = require('../router').router;
const models = require('../db').models;
const modelUtils = require('../db/modelUtils');
const userCodeCache = require('../cache').userCodeCache;
const userSecCodeCache = require('../cache').userSecCodeCache;

//验证手机号
router.post('/verifyPhone', function*() {
  this.verifyParams({
    phone: modelUtils.phoneRegExp,
    secCode: 'string',
  });

  //TODO:向mob验证验证
  const flag = true;

  if (flag) {
    userSecCodeCache.set(this.request.body.phone, true);
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

  this.session = {
    user: user.toJSON(),
  };
  this.body = user.toJSON();
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
    avatarStoreKey: {
      type: 'string',
      required: false,
    },
  });

  yield models.User.update(this.request.body, {
    where: {
      id: this.session.user.id,
    },
  });
});
