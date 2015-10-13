'use strict';

var path = require('path');
var copy = require('copy-to');

var config = {};

config.db = {
  host: 'localhost',
  database: 'shiyi',
  dialect: 'sqlite',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  logging: false,
  storage: path.join(__dirname, '../shiyi.sqlite')
};

exports.workerNum = 1;

exports.isUseRedis = false;

config.qiniu = {
  ACCESS_KEY: 'yoAi_mu1Km0b6BnogEqanD7R-nGGkomgHRXYsjJC',
  SECRET_KEY: 'ewvO5zokNKU9dxtdWpIE5NCKx1pKw33e0Q9pfwA2'
};

config.apns = {
  keyFile: null,
  certFile: null,
  debug: true
};

config.keys = ['shiyi-server', 'sadfag666'];
config.debug = true;
config.port = 8080;

if (process.env.NODE_ENV === 'production') {
  var customConfig = {};
  try {
    customConfig = require(path.join(__dirname, './config.js'));
  } catch (err) {
    // ignore error
  }
  copy(customConfig).override(config);
}

module.exports = config;