'use strict';

var router = require('../router').router;
var models = require('../db').models;
var debug = require('debug')('controllers/qiniu');
var utils = require('../utils');
var qiniu = require('qiniu');
var config = require('../config');

qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;

//七牛上传凭证
router.get('/getQiniuUptoken', function*() {
  var putPolicy = new qiniu.rs.PutPolicy('shiyi');
  var uptoken = putPolicy.token();

  this.body = uptoken;
});