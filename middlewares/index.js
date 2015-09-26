'use strict';

var isJSON = require('is-json');
var debug = require('debug')('middlewares/index');

//如无错误发生，添加200状态码
exports.addStatusCode = function() {
  return function*(next) {
    yield next;
    debug('It is addStatusCode middleware');

    if (!!this.body && this.body.message && this.body.message === 'Validation Failed') {
      this.status = 200;
      return this.body.statusCode = 422;
    }

    if (!!this.body && isJSON(this.body, true) && !this.body.statusCode) {
      return this.body.statusCode = 200;
    }
  };
};

exports.auth = function*(next) {
  debug('It is auth middleware');
  if (process.env.NODE_ENV !== 'test') {
    if (!this.session || !this.session.user) {
      debug('auth middleware: Not login.');
      return this.body = {
        statusCode: 401,
        message: '请登录后访问'
      };
    }
  } else {
    this.session = {
      user: {
        "id": 1,
        "phone": "15945990589",
        "nickname": '小王',
        "password": "123456",
        "gender": "M",
        "birthday": '1993-10-11',
        "hometown": '黑龙江 哈尔滨',
        "motto": "Do cool things that matter.",
        "avatarUrl": null,
        "wechatToken": null,
        "weiboToken": null,
        "qqToken": null,
        "isBlocked": false,
        "createdAt": "2015-09-09T05:43:11.021Z",
        "updatedAt": "2015-09-09T05:43:11.021Z"
      }
    };
  }

  yield next;
};