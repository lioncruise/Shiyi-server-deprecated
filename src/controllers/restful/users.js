'use strict';

var models = require('../../db').models;
var utils = require('../../utils');

exports.show = function*() {
  this.verifyParams({
    id: 'id'
  });
  var user = yield models.User.find({
    paranoid: true,
    where: {
      id: this.params.id,
      isBlocked: false
    }
  });

  if (!user) {
    return this.body = {
      statusCode: 404,
      message: '用户不存在'
    };
  }

  this.body = user.toJSON();
  this.body.ownAlbums = yield user.getOwnAlbums();

  for(var i = 0; i < this.body.ownAlbums.length; i++) {
    this.body.ownAlbums[i].pictureCount = yield models.Picture.getPictureCountByAlbumId(this.body.ownAlbums[i].id);
  }
};