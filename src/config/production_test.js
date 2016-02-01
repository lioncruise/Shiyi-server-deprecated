'use strict';

const fs = require('fs');
const path = require('path');

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
    logging: false,
  },
  redis: {
    host: 'f62bf74d09af44c2.m.cnbja.kvstore.aliyuncs.com',
    port: 6379,
    password: 'f62bf74d09af44c2:ShiyiServer233',
  },
  key: fs.readFileSync(path.join(__dirname, '../../crts/test.itimepost.com/for Nginx/shiyi_test_nginx.key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../../crts/test.itimepost.com/for Nginx/shiyi_test_nginx.crt.pem')),
};
