'use strict';

const config = require('../config');
const urllib = require('urllib');
const debug = require('debug')('utils/index');
const util = require('util');

exports.notification = require('./notification');
exports.models = require('./models');

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

  const result = yield urllib.requestThunk(config.sms.url, {
    method: 'POST',
    dataType: 'json',
    data: {
      apikey: config.sms.apikey,
      mobile: phone,
      text: util.format(config.sms.smsTemplate, code),
    },
  });

  return (result.data && result.data.result && result.data.result.count > 0);
};

exports.escapeRegExp = function(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};
