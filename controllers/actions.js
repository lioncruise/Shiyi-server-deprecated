'use strict';

var router = require('../router').router;
var models = require('../db').models;
var chance = require('chance').Chance();
var debug = require('debug')('controllers/actions');
var utils = require('../utils');
var middlewares = require('../middlewares');
var moment = require('moment');

// 获取一个人的全部动态
router.get('/getActions', function*() {
  var userId = parseInt(this.query.userId) ? parseInt(this.query.userId) : this.session.user.id;
  var user = yield models.User.find({
    paranoid: true,
    where: {
      id: userId,
      isBlocked: false
    }
  });

  if (!user) {
    return this.body = {
      statusCode: 404,
      message: '用户不存在'
    };
  }

  var actions = yield models.Action.findAll({
    paranoid: true,
    where: {
      UserId: userId,
      isBlocked: false
    },
    include: [{
      model: models.Picture
    }, {
      model: models.Album
    }, {
      model: models.Like,
      include: [{
        model: models.User
      }]
    }]
  });

  this.body = actions.map(function (action) {
    return action.toJSON();
  });

  for(var i = 0; i < this.body.length; i++) {
    var action = this.body[i];
    if(action.Album) {
      action.Album.pictureCount = yield models.Picture.getPictureCountByAlbumId(action.Album.id);
    }
    action.likeCount = yield models.Like.getLikeCountByActionId(action.id);
  }
});