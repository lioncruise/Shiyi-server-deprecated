'use strict';

const path = require('path');
const copy = require('copy-to');

let config = {};

config.db = {
  host: '127.0.0.1',
  database: 'shiyi',
  dialect: 'mysql',
  username: 'root',
  password: 'admin',
  pool: {
    max: 100,
    min: 0,
    idle: 5000,
    maxConnections: 100,
    minConnections: 0,
    maxIdleTime: 5000,
  },
  logging: false,
  timezone: '+08:00',
  dialectOptions: {
    charset: 'utf8mb4',
  },
};

config.mob = {
  appKey: {
    android: 'e522f4154186', //0cc394ac1a42f52ecd6e4bbd0ff0a6a8
    ios: 'e5234ac2176c', //36517dab04a46497fba706e587298edd
  },
};

config.defaultPictureKey = 'default';

config.tokenKey = 'oihag';

config.isUseRedis = false;

config.redis = {
  host: 'localhost',
  port: 6379,
  password: 'admin',
};

config.qiniu = {
  ACCESS_KEY: 'yoAi_mu1Km0b6BnogEqanD7R-nGGkomgHRXYsjJC',
  SECRET_KEY: 'ewvO5zokNKU9dxtdWpIE5NCKx1pKw33e0Q9pfwA2',
  domain: 'dn-itimepost.qbox.me',
};

config.getui = {
  host: 'https://api.getui.com/apiex.htm',
  appId: 'Yezv1XBlh89nw9ShM2Gju5',
  appKey: 'avLKVJLF1h7rWmHrT4zZ65',
  appSecert:'on31a4ZCtN9LaawNL6nv99',
  masterSecret: 'bRsEp8N4XsAteAwUi0hmY6',
  isOffLine: true, // 是否推送离线的终端
  offlineExpireTime: 3600 * 12 * 1000, // 离线等待时间
};

config.AndroidNotification = {
  appId: null,
  appKey: null,
  logo: null,
};

config.appName = 'shiyi_dev';
config.keys = ['shiyi', 'q(*^#"}}|ef'];
config.debug = true;
config.port = 8080;
config.url = 'http://127.0.0.1:8080';

config.ipFilter = ['*'];

let customConfig = {};
try {
  if (process.env.NODE_ENV === 'production') {
    customConfig = require(path.join(__dirname, './production.js'));
  } else if (process.env.NODE_ENV === 'production_test') {
    customConfig = require(path.join(__dirname, './production_test.js'));
  }
} catch (err) {
  // ignore error
}

function overwrite(obj1, obj2) {
  for (let key in obj2) {
    if (typeof (obj2[key]) === 'object' && obj2[key].constructor !== Array) {
      if (!obj1.hasOwnProperty(key)) {
        obj1[key] = {};
      }

      overwrite(obj1[key], obj2[key]);
    } else {
      obj1[key] = obj2[key];
    }
  }

  return obj1;
}

config = overwrite(config, customConfig);

module.exports = config;
