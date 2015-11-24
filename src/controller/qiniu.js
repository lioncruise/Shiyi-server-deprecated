'use strict';

const router = require('../router').router;
const qiniu = require('qiniu');
const config = require('../config');

qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;

//七牛上传凭证
router.get('/getQiniuUptoken', function*() {
  const putPolicy = new qiniu.rs.PutPolicy('shiyi');
  const uptoken = putPolicy.token();

  this.body = uptoken;
});
