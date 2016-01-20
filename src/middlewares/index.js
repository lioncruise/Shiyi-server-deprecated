'use strict';

const isJSON = require('is-json');
const jwt = require('jsonwebtoken');
const debug = require('debug')('middlewares/index');
const config = require('../config');
const redisToken = require('../utils').redisToken;

const urlsWithoutSession = [
  /^\/$/,
  /^\/test$/,
  /^\/getSeccode$/,
  /^\/recoverPassword$/,
  /^\/register$/,
  /^\/login$/,
  /^\/getValue$/,
  /^\/resetCache$/,
  /^\/getQiniuUptoken$/,
  /^\/rebuildDatabaseRedundancy$/,
  /^\/verifyPhone$/,
  /^\/pcLogin$/,
  /^\/getUserIdByKey$/,
  /^\/isExistingUser$/,

  // 公开信息权限
  /^\/albums\/\d+$/,
  /^\/memories\/\d+$/,
  /^\/pictures\/\d+$/,
  /^\/users\/\d+$/,
  /^\/reports\/\d+$/,
  /^\/searchAlbums$/,
  /^\/searchUsers$/,
  /^\/albumRanklist$/,
  /^\/dailies$/,
  /^\/getAlbumUserRelation$/,
  /^\/getUserUserRelation$/,
  /^\/getFans$/,
  /^\/getFollowAlbums$/,
  /^\/getFollowers$/,
  /^\/getPublicAlbums$/,
  /^\/getQRCode$/,
  /^\/dailies\/\d+$/,
];

const urlsNeedRawReturn = [
  /^\/dailies\/\d+$/,
];

function isInUrls(str, urlPatternList) {
  for (const reg of urlPatternList) {
    if (str.match(reg)) {
      return true;
    }
  }

  return false;
}

exports.addStatusCode = function() {
  return function*(next) {
    yield next;
    debug('It is addStatusCode middleware');
    if (isInUrls(this.path, urlsNeedRawReturn)) {
      return;
    }

    this.status = 200;
    if (this.body !== null && this.body !== undefined) {
      if (this.body.message && this.body.message === 'Validation Failed') {
        //如Validation Failed，修改status为200，添加422状态码
        this.body.statusCode = 422;
      }

      if (!this.body.statusCode) {
        //如无错误发生，添加200状态码
        this.body = {
          statusCode: 200,
          data: this.body,
        };
      }
    } else {
      //如空body，添加200状态码
      this.body = {
        statusCode: 200,
        data: null,
      };
    }
  };
};

exports.showBody = function() {
  return function*(next) {
    console.log('<<<------ this.request ----------------------->>>');
    console.log(this.request);
    console.log('-------- this.request.body ---------------------');
    console.log(this.request.body);
    console.log('-------- this.query ----------------------------');
    console.log(this.query);
    console.log('-------------- next -----------------------------');
    yield next;
    console.log('-------- this.response --------------------------');
    console.log(this.response);
    console.log('--------- the end -------------------------------\n\n\n\n\n');
  };
};

//用户登录token验证
exports.auth = function*(next) {
  debug('It is auth middleware');
  this.session = {};

  //PC端登录：用户模拟
  if (this.headers.userfrompc && Number.parseInt(this.headers.userfrompc)) {
    this.session = {
      user: {
        id: Number.parseInt(this.headers.userfrompc),
      },
    };
  }

  //非debug模式
  if (!config.debug || this.query.testEnterVerify) {
    const token = this.headers.token || this.query.token;
    try {
      this.session = jwt.verify(token, config.tokenKey);

      // 验证登录唯一性
      if (!(yield redisToken.verify(this.session.user.id, token))) {
        if (!isInUrls(this.path, urlsWithoutSession)) {
          this.body = {
            statusCode: 401,
            message: '已在其他客户端登录，请重新登录',
          };
          return;
        }
      }
    } catch (e) {
      if (!isInUrls(this.path, urlsWithoutSession)) {
        this.body = {
          statusCode: 401,
          message: '请登录后访问',
        };
        return;
      }
    }
  } else {
    //debug模式下，test时进行用户模拟
    this.session = {
      user: {
        id: 1,
      },
    };
  }

  yield next;
};

//添加getUserIdByQueryAndSession方法
exports.addFunctionGetUserIdByQueryAndSession = function(app) {
  app.context.getUserIdByQueryAndSession = function() {
    let UserId = null;
    if (Number.parseInt(this.query.userId)) {
      UserId = Number.parseInt(this.query.userId);
    } else {
      if (this.session && this.session.user && this.session.user.id) {
        UserId = this.session.user.id;
      } else {
        this.body = {
          statusCode: 422,
          message: '请登录后访问',
        };
      }
    }

    return UserId;
  };

  return function*(next) {
    yield* next;
  };
};
