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
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    timestamps: true,
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

config.sms = {
  isOK: false,
  smsTemplate: '【拾忆APP】您的验证码是%s。如非本人操作，请忽略本短信',
  url: 'http://yunpian.com/v1/sms/send.json',
  apikey: '2bafb98c7a73e2566f318cf468e096ae',
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

config.IOSNotification = {
  keyFile: path.join(__dirname, '../crts', 'for apns', 'key.pem'),
  certFile: path.join(__dirname, '../crts', 'for apns', 'cert.pem'),
  passphrase: '123456',
  debug: true,
};

config.AndroidNotification = {
  appId: null,
  appKey: null,
  logo: null,
};

config.keys = ['shiyi', 'q(*^#"}}|ef'];
config.debug = true;
config.port = 8080;
config.url = 'https://api.itimepost.com';

config.ipFilter = ['*'];

let devConfig = {};
try {
  devConfig = require(path.join(__dirname, './devConfig.js'));
} catch (err) {
  // ignore error
}

config = Object.assign(config, devConfig);

if (process.env.NODE_ENV === 'production') {
  let customConfig = {};
  try {
    customConfig = require(path.join(__dirname, './config.js'));
  } catch (err) {
    // ignore error
  }

  config = Object.assign(config, customConfig);
}

module.exports = config;
