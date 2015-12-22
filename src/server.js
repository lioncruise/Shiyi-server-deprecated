'use strict';

const process = require('process');
if (process.env.NODE_ENV === 'production') {
  require('oneapm');
}

const koa = require('koa');
const staticCache = require('koa-static-cache');
const rt = require('koa-rt');
const logger = require('koa-logger');
const redisStore = require('koa-redis');
const parameter = require('koa-parameter');
const formidable = require('koa-formidable');
const ipFilter = require('koa-ip-filter');
const ms = require('ms');
const path = require('path');
const http = require('http');

const config = require('./config');
const router = require('./router');
const middlewares = require('./middlewares');
const notification = require('./utils').notification;
const redisToken = require('./utils').redisToken;

const debug = require('debug')('server');

const app = koa();
app.name = 'shiyi-server';

//redis 初始化
redisToken.init();

//notification 初始化
notification.notificationInit();

//cookie加密
app.keys = config.keys;

//抓取错误
app.on('error', function(err) {
  console.error(err.stack);
});

//响应计时
app.use(rt());

//显示请求、响应
if (config.debug) {
  app.use(logger());
}

app.use(ipFilter({
  forbidden: '{ statusCode: 403, message: "Forbidden!" }',
  filter: config.ipFilter,
}));

//静态资源缓存
app.use(staticCache({
  dir: path.join(__dirname, '../static'),
  maxAge: ms('1y'),
  buffer: true,
  gzip: false,
}));

//解析http头
app.use(formidable());

//显示参数
if (process.env.NODE_ENV === 'development') {
  app.use(middlewares.showBody());
}

//如无错误发生，添加200状态码
app.use(middlewares.addStatusCode());

//参数验证
app.use(parameter(app));

//路由
app.use(router.serverRouter);
require('./controller/index.js');

module.exports = http.createServer(app.callback());
