'use strict';

var models = require('../../db').models;
var utils = require('../../utils');

exports.show = function*() {
  var album = yield models.Album.find({
    where: {
      id: this.params.id
    }
  });

  if (!album) {
    return this.body = {
      statusCode: 404,
      message: '相册不存在'
    };
  }

  this.body = utils.cloneJson(album);
};