'use strict';

var models = require('../../db').models;
var utils = require('../../utils');
var copy = require('copy-to');

exports.create = function*() {
  this.verifyParams({
    AlbumId: 'id',
    UserId: {
      type: 'id',
      required: false
    },
    UserIds: {
      type: 'string',
      required: false
    }
  });

  if (!this.request.body.UserId && !this.request.body.UserIds) {
    return this.body = {
      statusCode: 422,
      message: "Validation Failed"
    };
  }

  var that = this;
  // 同一条AlbumId、UserId数据库中只能插入一次
  // 插入数据时会进行外键检测

  //多用户UserIds
  if (this.request.body.UserIds) {
    var userIds;
    try {
      userIds = this.request.body.UserIds.split(',');
    } catch (e) {
      return this.body = {
        statusCode: 422,
        message: "Validation Failed"
      };
    }
    var _t = userIds.map(function(userId) {
      return models.AlbumUser.create({
        AlbumId: that.request.body.AlbumId,
        UserId: userId
      });
    });
    try {
      yield _t;
      this.body = _t.map(function(albumUser) {
        return albumUser.toJSON();
      });
    } catch (e) {
      this.body = {
        statusCode: 422,
        message: e.name
      };
    }
  } else {
    //单用户UserId
    try {
      var albumUser = yield models.AlbumUser.create(this.request.body);
      this.body = albumUser.toJSON();
    } catch (e) {
      this.body = {
        statusCode: 422,
        message: e.name
      };
    }
  }
};