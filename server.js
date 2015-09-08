'use strict';

var koa = require('koa');
var ms = require('ms');
var staticCache = require('koa-static-cache');
var rt = require('koa-rt');
var logger = require('koa-logger');
var session = require('koa-session');
var bodyparser = require('koa-bodyparser');
var onerror = require('koa-onerror');
var https = require('https');
var http = require('http');
var path = require('path');
var config = require('./config');
var router = require('./router');
var utils = require('./utils');

var app = koa();

//cookie加密
app.keys = config.keys;

//响应计时
app.use(rt());

//静态资源缓存
app.use(staticCache({
  dir: path.join(__dirname, 'static'),
  maxAge: ms('1y'),
  buffer: !config.debug,
  gzip: !config.debug
}));

//显示请求、响应
if (config.debug) {
  app.use(logger());
}

//使用cookie、session
app.use(session(app));

//解析http
app.use(bodyparser());

//路由
app.use(router);

//抓取错误
onerror(app);

http.createServer(app.callback()).listen(config.port);
utils.log('HTTPS server is listening %s.', config.port);