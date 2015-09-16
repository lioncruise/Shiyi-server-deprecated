'use strict';

var path = require('path');
var copy = require('copy-to');

var config = module.exports = {};

config.db = {
    host: 'localhost',
    database: 'shiyi',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: false,
    storage: path.join(__dirname, '../shiyi.sqlite')
};

config.keys = ['shiyi-server', 'sadfag'];
config.debug = true;
config.port = 8080;

var customConfig = {};
try {
  customConfig = require(path.join(__dirname, 'config.js'));
} catch(err) {
  // ignore error
}

copy(customConfig).override(config);