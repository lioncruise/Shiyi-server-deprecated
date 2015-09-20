'use strict';

var router = require('../router').router;
var models = require('../db').models;
var chance = require('chance').Chance();
var debug = require('debug')('controllers/version');
var utils = require('../utils');

//查询android、ios应用版本
router.get('/getVersion', function*() {
  if (this.query.type && (this.query.type === 'android' || this.query.type === 'ios')) {
    var version = yield models.Keyvalue.find({
      where: {
        key: this.query.type + 'Version'
      }
    });
    var downloadUrl = yield models.Keyvalue.find({
      where: {
        key: this.query.type + 'DownloadUrl'
      }
    });
    if (version && downloadUrl) {
      return this.body = {
        version: version,
        downloadUrl: downloadUrl
      };
    }
  }

  this.body = {
    statusCode: 404,
    message: '无有效信息'
  };
});