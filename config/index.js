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

config.sms = {
    url: 'https://web.sms.mob.com/sms/verify',
    appkey: 'a8abe6eaf81e',
    zone: '86'
};

config.keys = ['shiyi-server', 'sadfag'];
config.debug = true;
config.port = 8080;
config.host = 'http://127.0.0.1:8080';

var customConfig = {};
try {
    customConfig = require(path.join(__dirname, './config.js'));
} catch (err) {
    // ignore error
}

copy(customConfig).override(config);

module.exports = config;