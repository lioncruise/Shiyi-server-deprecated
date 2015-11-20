'use strict';

var router = require('../router').router;
var models = require('../db').models;
var debug = require('debug')('controllers/albumUsers');
var config = require('../config');

router.delete('/albumUsers', function*() {
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

  try {
    if (this.request.body.UserIds) {
      //多用户UserIds
      var userIds = this.request.body.UserIds.split(',');
      var _t = userIds.map(function(userId) {
        return models.AlbumUser.destroy({
          where: {
            AlbumId: that.request.body.AlbumId,
            UserId: userId
          }
        });
      });
      _t = yield _t;
    } else {
      //单用户UserId
      var albumUser = yield models.AlbumUser.destroy({
        where: this.request.body
      });
    }
  } catch (e) {
    this.body = {
      statusCode: 422,
      message: e.name
    };
  }
});