'use strict';

var isJSON = require('is-json');

//如无错误发生，添加200状态码
exports.addStatusCode = function() {
  return function*(next) {
    yield next;

    if (!!this.body && !this.body.statusCode) {
      this.body.statusCode = 200;
    }
  };
};