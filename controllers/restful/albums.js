'use strict';

var models = require('../../db').models;
var utils = require('../../utils');

exports.show = function*() {
  var album = yield models.Album.find({
    where: {
      id: this.params.id,
      isBlocked: false
    },
    include: [{
      model: models.Picture
    },
    {
      model: models.User,
      as: 'Creator'
    }]
  });

  if (!album) {
    return this.body = {
      statusCode: 404,
      message: '相册不存在'
    };
  }

  this.body = utils.cloneJson(album);
};

exports.create = function*() {
  this.verifyParams({
    title: 'string',
    description: {
      type: 'string',
      required: true,
      allowEmpty: true
    },
    tag: {
      type: 'string',
      required: true,
      allowEmpty: true
    },
    isShare: 'bool',
    isPublic: 'bool',
    isShowRawInfo: 'bool',
    allowLike: 'bool',
    allowComment: 'bool'
  });

  var album = models.Album.build(this.request.body);
  album.UserId = this.session.user.id;

  album = yield album.save();

  var tags = [];
  try {
    tags = this.request.body.split(',');
  } catch(e) {
    tags = [];
  }

  var _tArray = [];
  for(var i = 0; i < tags.length; i++) {
    var _t = yield models.Tag.findOrCreate({
      where: {
        name: tags[i]
      }
    });
    _tArray.push(_t);
  }
  tags = _tArray;

  album.setTags(tags);
  yield album.save();

  this.body = utils.cloneJson(album);
};