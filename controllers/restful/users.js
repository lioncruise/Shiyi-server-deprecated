'use strict';

var models = require('../../db').models;
var utils = require('../../utils');

exports.show = function*() {
  this.verifyParams({
    id: 'id'
  });
  var user = yield models.User.find({
    where: {
      id: this.params.id,
      isBlocked: false
    },
    include: [{
      model: models.Album
    }]
  });

  if (!user) {
    return this.body = {
      statusCode: 404,
      message: '用户不存在'
    };
  }

  this.body = user.toJSON();

  for(var i = 0; i < this.body.Albums.length; i++) {
    this.body.Albums[i].pictureCount = yield models.Picture.getPictureCountByAlbumId(this.body.Albums[i].id);
  }
};