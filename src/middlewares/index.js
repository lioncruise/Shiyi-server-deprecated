'use strict';

const isJSON = require('is-json');
const jwt = require('jsonwebtoken');
const debug = require('debug')('middlewares/index');
const config = require('../config');
const redisToken = require('../utils').redisToken;
const cacheManager = require('cache-manager');

const memoryCache = cacheManager.caching({ store: 'memory', max: 128, ttl: config.pageCache.ttl });

const urlsWithoutSession = [
  /^\/$/,
  /^\/test$/,
  /^\/getSeccode$/,
  /^\/recoverPassword$/,
  /^\/register$/,
  /^\/login$/,
  /^\/getValue$/,
  /^\/resetCache$/,
  /^\/getQiniuUptoken$/,
  /^\/rebuildDatabaseRedundancy$/,
  /^\/verifyPhone$/,
  /^\/pcLogin$/,
  /^\/getUserIdByKey$/,
  /^\/isExistingUser$/,

  // 公开信息权限
  /^\/albums\/\d+$/,
  /^\/tags$/,
  /^\/tags\/\d+$/,
  /^\/memories\/\d+$/,
  /^\/pictures\/\d+$/,
  /^\/users\/\d+$/,
  /^\/reports\/\d+$/,
  /^\/searchAlbums$/,
  /^\/searchUsers$/,
  /^\/albumRanklist$/,
  /^\/dailies$/,
  /^\/getAlbumUserRelation$/,
  /^\/getUserUserRelation$/,
  /^\/getFans$/,
  /^\/getFollowAlbums$/,
  /^\/getFollowers$/,
  /^\/getPublicAlbums$/,
  /^\/getQRCode$/,
  /^\/dailies\/\d+$/,
  /^\/joinAlbum$/,

  // monitor
  /^\/sendDaily$/,

  // shared pages
  /^\/userShareHtml/,
  /^\/memoryShareHtml/,
  /^\/albumShareHtml/,
  /^\/appShareHtml/,

];

const urlsNeedRawReturn = [
  /^\/dailies\/\d+$/,
  /^\/joinAlbum$/,

  // shared pages
  /^\/userShareHtml/,
  /^\/memoryShareHtml/,
  /^\/albumShareHtml/,
  /^\/appShareHtml/,
];

// 需要缓存的GET页面（返回）。
// 只缓存get请求，缓存页面通过带参数的 GET 的 URL 区分
const urlsUseCache = [
  {
    reg: /^\/dailies\/\d+$/,
    ttl: 60 * 60, // 缓存时间1小时
  },
  {
    reg: /^\/tags$/,
    ttl: 60 * 60, // 缓存时间1小时
  },
  {
    reg: /^\/userShareHtml/, //默认缓存时间config.pageCache.ttl
  },
  { reg: /^\/memoryShareHtml/ },
  { reg: /^\/albumShareHtml/ },
  { reg: /^\/appShareHtml/ },
];

function isInUrls(str, urlPatternList) {
  for (let reg of urlPatternList) {
    if (str.match(reg)) {
      return true;
    }
  }

  return false;
}

exports.addStatusCode = function() {
  return function*(next) {
    yield next;
    debug('It is addStatusCode middleware');
    if (isInUrls(this.path, urlsNeedRawReturn)) {
      return;
    }

    this.status = 200;
    if (this.body !== null && this.body !== undefined) {
      if (this.body.message && this.body.message === 'Validation Failed') {
        //如Validation Failed，修改status为200，添加422状态码
        this.body.statusCode = 422;
      }

      if (!this.body.statusCode) {
        //如无错误发生，添加200状态码
        this.body = {
          statusCode: 200,
          data: this.body,
        };
      }
    } else {
      //如空body，添加200状态码
      this.body = {
        statusCode: 200,
        data: null,
      };
    }
  };
};

exports.showBody = function() {
  return function*(next) {
    console.log('<<<------ this.request ----------------------->>>');
    console.log(this.request);
    console.log('-------- this.request.body ---------------------');
    console.log(this.request.body);
    console.log('-------- this.query ----------------------------');
    console.log(this.query);
    console.log('-------------- next -----------------------------');
    yield next;
    console.log('-------- this.response --------------------------');
    console.log(this.response);
    console.log('--------- the end -------------------------------\n\n\n\n\n');
  };
};

//用户登录token验证
exports.auth = function*(next) {
  debug('It is auth middleware');
  this.session = {};

  //PC端登录：用户模拟
  if (this.headers.userfrompc && Number.parseInt(this.headers.userfrompc)) {
    this.session = {
      user: {
        id: Number.parseInt(this.headers.userfrompc),
      },
    };
  }

  //非debug模式
  if (!config.debug || this.query.testEnterVerify) {
    const token = this.headers.token || this.query.token;
    try {
      this.session = jwt.verify(token, config.tokenKey);

      // 验证登录唯一性
      if (!(yield redisToken.verify(this.session.user.id, token))) {
        if (!isInUrls(this.path, urlsWithoutSession)) {
          this.body = {
            statusCode: 401,
            message: '已在其他客户端登录，请重新登录',
          };
          return;
        }
      }
    } catch (e) {
      if (!isInUrls(this.path, urlsWithoutSession)) {
        this.body = {
          statusCode: 401,
          message: '请登录后访问',
        };
        return;
      }
    }
  } else {
    //debug模式下，test时进行用户模拟
    this.session = {
      user: {
        id: 1,
      },
    };
  }

  yield next;
};

//添加getUserIdByQueryAndSession方法
exports.addFunctionGetUserIdByQueryAndSession = function(app) {
  app.context.getUserIdByQueryAndSession = function(isAddRespoenseBody) {
    let UserId = null;
    if (Number.parseInt(this.query.userId)) {
      UserId = Number.parseInt(this.query.userId);
    } else {
      if (this.session && this.session.user && this.session.user.id) {
        UserId = this.session.user.id;
      } else if (isAddRespoenseBody) {
        this.body = {
          statusCode: 422,
          message: '请登录后访问',
        };
      }
    }

    return UserId;
  };

  return function*(next) {
    yield* next;
  };
};

//页面缓存
exports.pageCache = function() {
  return function*(next) {

    if (this.request.method === 'GET') { // 只缓存get请求
      for (let url of urlsUseCache) {
        if (this.path.match(url.reg)) {
          const cacheResponse = memoryCache.get(this.request.url);
          if (cacheResponse) {
            this.response.body = cacheResponse;
          } else {
            yield next;
            memoryCache.set(this.request.url, this.response.body, { ttl: url.ttl ? url.ttl : config.pageCache.ttl });
          }

          return;
        }
      }
    }

    yield next;
  };
};
