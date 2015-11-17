'use strict';

var config = require('../config');
var urllib = require('urllib');
var notification = require('./notification');
var debug = require('debug')('utils/index');
var util = require('util');

exports.notification = notification;

exports.phoneRegExp = /(^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/;

exports.cloneJson = function(obj) {
  return JSON.parse(JSON.stringify(obj));
};

//发送短信
exports.sendSMS = function*(phone, code) {
  debug('Security code [%s] has sent to phone [%s].', code, phone);

  if (!config.sms.isOK) {
    return true;
  }

  var result = yield urllib.requestThunk(config.sms.url, {
    method: 'POST',
    dataType: 'json',
    data: {
      apikey: config.sms.apikey,
      mobile: phone,
      text: util.format(config.sms.smsTemplate, code)
    }
  });

  return (result.data && result.data.result && result.data.result.count > 0);
};

exports.escapeRegExp = function(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
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