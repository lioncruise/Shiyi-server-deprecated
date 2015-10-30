'use strict';

var path = require('path');
var copy = require('copy-to');

var config = {};

config.db = {
  host: 'localhost',
  database: 'shiyi',
  dialect: 'sqlite',
  pool: {
    maxConnections: 10,
    minConnections: 1,
    maxIdleTime: 10000
  },
  logging: false,
  storage: path.join(__dirname, '../shiyi.sqlite')
};

config.workerNum = 1;

config.defaultPictureKey = "default";

config.isUseRedis = false;

config.qiniu = {
  ACCESS_KEY: 'yoAi_mu1Km0b6BnogEqanD7R-nGGkomgHRXYsjJC',
  SECRET_KEY: 'ewvO5zokNKU9dxtdWpIE5NCKx1pKw33e0Q9pfwA2',
  domain: 'dn-itimepost.qbox.me'
};

config.IOSNotification = {
  keyFile: path.join(__dirname, '../crts', 'for apns', 'key.pem'),
  certFile: path.join(__dirname, '../crts', 'for apns', 'cert.pem'),
  passphrase: '123456',
  debug: true
};

config.AndroidNotification = {
  appId: null,
  appKey: null,
  logo: null
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