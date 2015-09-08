'use strict';

var config = require('../config');

exports.phoneRegExp = /(^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/;

exports.cloneJson = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};