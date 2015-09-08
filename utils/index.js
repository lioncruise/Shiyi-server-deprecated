'use strict';

var config = require('../config');

var logStore = function(args) {
  //TODO: 记录运行log
};

var errorStore = function(args) {
  //TODO: 记录运行error
};

exports.log = config.debug ? console.log : logStore;
exports.error = config.debug ? console.error : errorStore;