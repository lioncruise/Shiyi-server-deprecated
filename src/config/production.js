'use strict';

module.exports = {
  appName: 'shiyi',
  port: 8080,
  url: 'https://api.itimepost.com',
  debug: false,
  db: {
    host: 'rdsic94ms67n46l7427si.mysql.rds.aliyuncs.com',
    database: 'shiyi',
    dialect: 'mysql',
    username: 'shiyi',
    password: 'apZgL2mQRzcIYTNM',
    logging: false,
  },
  redis: {
    host: 'f62bf74d09af44c2.m.cnbja.kvstore.aliyuncs.com',
    port: 6379,
    password: 'f62bf74d09af44c2:ShiyiServer233',
  },
  getui: {
    host: 'https://api.getui.com/apiex.htm',
    appId: 'PdTKItsviK8EmwYhSwCpg3',
    appKey: '7VcV5RODTz5BEiqtpXPPf5',
    appSecert:'GZz4wca1mj9qbLrTsYyld3',
    masterSecret: '9kRM3KSp5a8LEQd7yIS1T6',
    isOffLine: true,
    offlineExpireTime: 3600 * 12 * 1000,
  },
};
