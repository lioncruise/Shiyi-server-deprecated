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
    pool: {
      max: 100,
      min: 0,
      idle: 5000,
      maxConnections: 100,
      minConnections: 0,
      maxIdleTime: 5000,
    },
    logging: false,
  },
  redis: {
    host: 'f62bf74d09af44c2.m.cnbja.kvstore.aliyuncs.com',
    port: 6379,
    password: 'f62bf74d09af44c2:ShiyiServer233',
  },
};
