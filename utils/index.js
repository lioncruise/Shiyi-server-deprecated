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
exports.sendSMS = function*(phone, code) {
  var res = yield urllib.request(config.sms.url, {
    method: 'POST',
    data: {
      appkey: config.sms.appkey,
      phone: phone,
      zone: config.sms.zone,
      code: code
    }
  });

  debug('sendSMS Server response: ' + res.data.toString());

  debug('Security code [%s] has sent to phone [%s].', code, phone);
};

//获取更新instance时的obj
exports.getUpdateData = function(body, fields) {
  var data = {};
  fields.forEach(function(field) {
    var name = field[0];
    var type = field[1];
    if (body[name] !== null && body[name] !== undefined) {
      var value = body[name];
      switch (type) {
        case 'bool':
          data[name] = (body[name] !== 'false' && body[name] !== '0');
          break;
        case 'boolean':
          data[name] = (body[name] !== 'false' && body[name] !== '0');
          break;
        case 'string':
          data[name] = String(body[name]);
          break;
        case 'int':
          data[name] = parseInt(body[name]);
          break;
        case 'integer':
          data[name] = parseInt(body[name]);
          break;
        case 'float':
          data[name] = parseFloat(body[name]);
          break;
      }
    }
  });

  return data;
};