'use strict';

var os = require('os');

module.exports = {
  port: 80,
  host: 'http://api.itimepost.com',
  workerNum: os.cpus().length,
  debug: false
};