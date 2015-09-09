'use strict';

var isJSON = require('is-json');
var debug = require('debug')('middlewares/index');

//如无错误发生，添加200状态码
exports.addStatusCode = function() {
  return function*(next) {
    yield next;
    if (!!this.body && isJSON(this.body, true) && !this.body.statusCode) {
      this.body.statusCode = 200;
    }
  };
};

exports.auth = function() {
  return function*(next) {
    debug('auth middleware');
    if(!this.session || !this.session.user) {
      debug('auth middleware: Not login.');
      return this.body = {
        statusCode: 401,
        message: '请登录后访问'
      };
    }
    yield next;
  };
};