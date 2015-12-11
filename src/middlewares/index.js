'use strict';

const isJSON = require('is-json');
const debug = require('debug')('middlewares/index');

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
    console.log('------------------------------------------------');
    console.log(this.request);
    console.log('------------------------------------------------');

    yield next;
    console.log('------------------------------------------------');
    console.log(this.response);
    console.log('------------------------------------------------');
  };
};

//用户登录验证
exports.auth = function*(next) {
  debug('It is auth middleware');

  if (urlsWithoutSession.indexOf(this.path) >= 0) {
    yield next;
    return;
  }

  if (this.headers.userfrompc && Number.parseInt(this.headers.userfrompc)) {
    this.session = {
      user: {
        id: Number.parseInt(this.headers.userfrompc),
      },
    };
  } else {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
      if (!this.session || !this.session.user) {
        debug('auth middleware: Not login.');
        this.body = {
          statusCode: 401,
          message: '请登录后访问',
        };
        return;
      }
    } else {
      this.session = {
        user: {
          id: 1,
        },
      };
    }
  }

  yield next;
};
