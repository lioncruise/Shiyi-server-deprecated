'use strict';

const isJSON = require('is-json');
const jwt = require('jsonwebtoken');
const debug = require('debug')('middlewares/index');
const config = require('../config');

const urlsWithoutSession = [
  '/', '/test', '/getSeccode', '/changePassword',
  '/register', '/login', '/logout', '/getValue', '/resetCache',
  '/getQiniuUptoken', '/rebuildDatabaseRedundancy',
  '/verifyPhone', '/pcLogin', '/getUserIdByKey',
];

exports.addStatusCode = function() {
  return function*(next) {
    yield next;
    debug('It is addStatusCode middleware');
    this.status = 200;
    if (this.body) {
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
    console.log('-------- this.request --------------------------');
    console.log(this.request);
    console.log('-------- this.request.body ---------------------');
    console.log(this.request.body);
    console.log('-------- this.query ----------------------------');
    console.log(this.query);
    console.log('-------- this.header ----------------------------');
    console.log(this.header);
    console.log('-------------------------------------------------');

    yield next;
    console.log('-------- this.response --------------------------');
    console.log(this.response);
    console.log('------------------------------------------------');
  };
};

//用户登录token验证
exports.auth = function*(next) {
  debug('It is auth middleware');

  if (urlsWithoutSession.indexOf(this.path) >= 0) {
    yield next;
    return;
  }

  this.session = {};

  if (this.headers.userfrompc && Number.parseInt(this.headers.userfrompc)) {
    this.session = {
      user: {
        id: Number.parseInt(this.headers.userfrompc),
      },
    };
  } else {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
      const token = this.headers.token || this.query.token;
      try {
        this.session = jwt.verify(token, config.tokenKey);
      } catch (e) {
        this.body = {
          statusCode: 401,
          message: '请登录后访问',
        };
        return;
      }
    } else {
      //test模式
      this.session = {
        user: {
          id: 1,
        },
      };
    }
  }

  yield next;
};
