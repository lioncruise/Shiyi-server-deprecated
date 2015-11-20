'use strict';

const koa = require('koa');
const ms = require('ms');
const staticCache = require('koa-static-cache');
const rt = require('koa-rt');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const sessionWithoutRedis = require('koa-session');
const redisStore = require('koa-redis');
const https = require('https');
const parameter = require('koa-parameter');
const formidable = require('koa-formidable');
const http = require('http');
const path = require('path');
const config = require('./config');
const router = require('./router');
const debug = require('debug')('server');
const middlewares = require('./middlewares');

const app = koa();
app.name = 'shiyi-server';

//cookie加密
app.keys = config.keys;

//抓取错误
app.on('error', function(err) {
  console.error(err.stack);
});

//响应计时
app.use(rt());

//静态资源缓存
app.use(staticCache({
  dir: path.join(__dirname, '../static'),
  maxAge: ms('1y'),
  buffer: !config.debug,
  gzip: !config.debug,
}));

//显示请求、响应
if (config.debug) {
  app.use(logger());
}

//使用cookie、session
if (config.debug || !config.isUseRedis) {
  app.use(sessionWithoutRedis({
    maxAge: ms('365 days'),
  }, app));
} else {
  app.use(session({
    store: redisStore(),
  }));
}

//解析http头
app.use(formidable());

//显示参数
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
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
