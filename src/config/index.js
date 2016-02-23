'use strict';

const path = require('path');
const copy = require('copy-to');
const fs = require('fs');

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

config.defaultBackgroundPictureKey = 'defaultBackground';

config.androidAppDownloadKey = 'app-android-shiyi.apk';

config.iosAppDownloadUrl = 'https://itunes.apple.com/us/app/shi-yi-yi-zhang-tu-pian-yi/id1074173529?l=zh&ls=1&mt=8';

config.tokenKey = 'oihag';

config.isUsePageCache = true;

config.pageCache = {
  ttl: 60, //默认缓存时间
};

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
  template: { // 最后的推送消息会组合成 '【${title}】${text}' 字符串，通过穿透消息推送，可根据title进行判断类型
    dailySend: {
      title: '您有新的日报消息', // 日报推送，跳转到日报列表界面
      text: '<%- title %>', // text是与本条日报相关的一些信息，不同日报消息不同，不能借此判断推送类型
    },
    userUserFollow: {
      title: '有人关注了您', // 跳转到......页面
      text: '<%- nikeName %> 关注了您', //
    },
    receiveMessage: {
      title: '您收到了一条新私信', //
      text: '', // 纯文本
    },
    memoryComment: {
      title: '您的记忆有新的评论', //
      text: '', // 纯文本
    },
    commentComment: {
      title: '您有新的新评论', // 纯文本
      text: '', // 纯文本
    },
    memoryLike: {
      title: '有人赞了您的相册', //
      text: '', // 纯文本
    },
  },
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
  } else if (process.env.NODE_ENV === 'production_test' || process.env.NODE_ENV === 'production_test_dev') {
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
