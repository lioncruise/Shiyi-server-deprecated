'use strict';

const server = require('./server');
const config = require('./config');
const http = require('http');

server.listen(config.port);

console.log('HTTP server is listening %s.', config.port);
