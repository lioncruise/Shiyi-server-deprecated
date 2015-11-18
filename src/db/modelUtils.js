'use strict';

const qiniu = require('qiniu');
const config = require('../config');

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
  const policy = new qiniu.rs.GetPolicy();
  return policy.makeRequest(baseUrl);
}

module.exports = {
  getUrlFunction,
};
