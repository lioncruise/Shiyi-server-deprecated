'use strict';

const server = require('./server');
const http = require('http');
const config = require('./config');

server.listen(config.port);
console.log('HTTP server is listening %s.', config.port);
