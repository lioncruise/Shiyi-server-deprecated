'use strict';

const qiniu = require('qiniu');
const config = require('../config');
const moment = require('moment');

//七牛设置
qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;

/**
 * 获取七牛下载链接
 * @param  {String} key 在七牛空间中的存储键名
 * @return {String}     可用来直接下载的URL地址
 */
function getUrlFunction(key) {
  const baseUrl = qiniu.rs.makeBaseUrl(config.qiniu.domain, key);
  const policy = new qiniu.rs.GetPolicy(86400); //过期时间24小时
  return policy.makeRequest(baseUrl) + '&key=' + key;
}

function getThumbnailUrlFunction(key) {
  const baseUrl = qiniu.rs.makeBaseUrl(config.qiniu.domain, key);
  const iv = new qiniu.fop.ImageView();
  iv.width = 200;
  const policy = new qiniu.rs.GetPolicy(86400); //过期时间24小时
  return policy.makeRequest(iv.makeRequest(baseUrl)) + '&key=' + key + '_thumbnail';
}

const phoneRegExp = /(^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/;

module.exports = {
  getUrlFunction,
  phoneRegExp,
  getThumbnailUrlFunction,
};
