'use strict';

var koa = require('koa');
var ms = require('ms');
var staticCache = require('koa-static-cache');
var rt = require('koa-rt');
var logger = require('koa-logger');
var session = require('koa-session');
var onerror = require('koa-onerror');
var https = require('https');
var parameter = require('koa-parameter');
var formidable = require('koa-formidable');
var http = require('http');
var path = require('path');
var config = require('./config');
var router = require('./router');
var debug = require('debug')('server');
var middlewares = require('./middlewares');

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

//解析http头
app.use(formidable());

//参数验证
app.use(parameter(app));

//如无错误发生，添加200状态码
app.use(middlewares.addStatusCode());

//路由
app.use(router.serverRouter);
require('./controllers/index.js');

//抓取错误
onerror(app);

module.exports = http.createServer(app.callback());