'use strict';

var models = require('../../db').models;
var utils = require('../../utils');
var copy = require('copy-to');
var config = require('../../config');

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

  try {
    if (this.request.body.UserIds) {
      //多用户UserIds
      if (config.debug) {
        // 解决sqlite在测试环境中的问题
        // http://docs.sequelizejs.com/en/latest/api/model/#findorcreateoptions-promiseinstance-created
        var userIds = this.request.body.UserIds.split(',');
        this.body = [];
        for (var i = 0; i < userIds.length; i++) {
          var albumUser = yield models.AlbumUser.findOrCreate({
            where: {
              AlbumId: that.request.body.AlbumId,
              UserId: userIds[i]
            }
          });
          this.body.push(albumUser[0].toJSON());
        }
      } else {
        var userIds = this.request.body.UserIds.split(',');
        var _t = userIds.map(function(userId) {
          return models.AlbumUser.findOrCreate({
            where: {
              AlbumId: that.request.body.AlbumId,
              UserId: userId
            }
          });
        });
        _t = yield _t;
        this.body = _t.map(function(albumUser) {
          return albumUser[0].toJSON();
        });
      }
    } else {
      //单用户UserId
      var albumUser = yield models.AlbumUser.findOrCreate({
        where: this.request.body
      });
      this.body = albumUser[0].toJSON();
    }
  } catch (e) {
    this.body = {
      statusCode: 422,
      message: e.name
    };
  }
};