'use strict';

module.exports = {
  appName: 'shiyi_test',
  port: 7777,
  url: 'https://test.itimepost.com',
  debug: false,
  db: {
    host: 'rdsic94ms67n46l7427si.mysql.rds.aliyuncs.com',
    database: 'shiyi_test',
    dialect: 'mysql',
    username: 'shiyi_test',
    password: 'ZmcOfUy7r7sAtr7A',
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
