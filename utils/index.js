'use strict';

var config = require('../config');
var urllib = require('urllib');
var co = require('co');
var debug = require('debug')('utils/index');

exports.phoneRegExp = /(^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/;

exports.cloneJson = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

//发送短信
exports.sendMessage = function*(phone, code) {
  var res = yield urllib.request(config.sms.url, {
    method: 'POST',
    data: {
      appkey: config.sms.appkey,
      phone: phone,
      zone: config.sms.zone,
      code: code
    }
  });

  debug('Security code [%s] has sent to phone [%s].', code, phone);
};