'use strict';

var isJSON = require('is-json');
var debug = require('debug')('middlewares/index');

var urlsWithoutSession = ['/', '/test', '/getSeccode', '/changePassword', '/register', '/login', '/logout', '/getVersion'];

//如无错误发生，添加200状态码
exports.addStatusCode = function() {
  return function*(next) {
    yield next;
    debug('It is addStatusCode middleware');

    if (this.body && this.body.message && this.body.message === 'Validation Failed') {
      this.status = 200;
      return this.body.statusCode = 422;
    }

    if (this.body && !this.body.statusCode) {
      return this.body = {
        statusCode: 200,
        data: this.body
      };
    }

    if (!this.body) {
      return this.body = {
        statusCode: 200
      };
    }
  };
};

//针对IOS的json请求修改true,false
exports.iOSJsonFormat = function() {
  return function*(next) {
    if(this.query &&  this.query.system === 'ios' && this.request.body && isJSON(this.request.body, true)) {
      var _str = JSON.stringify(this.request.body).replace(/"@true"/g, 'true').replace(/'@true'/g, 'true').replace(/"@false"/g, 'false').replace(/'@false'/g, 'false');
      this.request.body = JSON.parse(_str);
    }

    yield next;
  };
};

exports.showBody = function() {
  return function*(next) {
    console.log('-----------------this.path--------------------');
    console.log(this.path);
    console.log('-----------------this.query--------------------');
    console.log(this.query);
    console.log('-----------------this.params--------------------');
    console.log(this.params);
    console.log('--------------this.request.body-----------------');
    console.log(this.request.body);

    yield next;
  };
};

//用户登录验证
exports.auth = function*(next) {
  debug('It is auth middleware');

  if (urlsWithoutSession.indexOf(this.path) === -1) {
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
  }

  yield next;
};