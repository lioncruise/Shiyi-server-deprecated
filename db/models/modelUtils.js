'use strict';

var debug = require('debug')('db/models/modelUtils');
var qiniu = require('qiniu');
var config = require('../../config');

qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;

exports.getUrlFunction = function(urlFieldName) {
  return function(argument) {
    var url = this.getDataValue(urlFieldName);
    var baseUrl = qiniu.rs.makeBaseUrl(config.qiniu.domain, url);
    var policy = new qiniu.rs.GetPolicy();
    return policy.makeRequest(baseUrl);
  };
};