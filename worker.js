'use strict';

var server = require('./server');
var http = require('http');
var config = require('./config');
var debug = require('debug')('worker');

server.listen(config.port);
debug('HTTP server is listening %s.', config.port);
console.log('HTTP server is listening %s.', config.port);