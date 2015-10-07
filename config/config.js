'use strict';

var os = require('os');

module.exports = {
  port: 8080,
  workerNum: os.cpus().length,
  debug: false
};