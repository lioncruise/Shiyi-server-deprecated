'use strict';

var models = require('../../db').models;
var utils = require('../../utils');
var copy = require('copy-to');

exports.show = function*() {
  this.verifyParams({
    id: 'id',
    offset: {
      type: 'int',
      required: false,
      allowEmpty: false
    },
    limit: {
      type: 'int',
      required: false,
      allowEmpty: false
    },
    isShowUsers: {
      type: 'bool',
      required: false,
      allowEmpty: false
    }
  });
  var album = yield models.Album.find({
    paranoid: true,
    where: {
      id: this.params.id,
      isBlocked: false
    },
    include: [{
      model: models.Picture
    }, {
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

  this.body = (yield album.getRelatedInfo()).toJSONwithAttributes();

  //根据isShowUsers加入Users
  if (this.query.isShowUsers === 'true') {
    this.body.Users = yield album.getUsers();
  }

  //如果limit为0，直接跳过下面的过程
  if (this.query.limit && this.query.limit === '0') {
    return;
  }

  //根据limit和offset查找picture
  var offset = parseInt(this.query.offset) || 0;
  var limit = (this.query.limit && parseInt(this.query.limit) < 50) ? parseInt(this.query.limit) : 50;

  var Pictures = yield models.Picture.findAll({
    paranoid: true,
    where: {
      AlbumId: this.params.id,
      isBlocked: false
    },
    offset: offset,
    limit: limit
  });
  this.body.Pictures = Pictures.map(function(picture) {
    return picture.toJSON();
  });

  this.body.offset = offset;
  this.body.limit = limit;

  for (var i = 0; i < this.body.Pictures.length; i++) {
    this.body.Pictures[i].likeCount = yield models.Like.getLikeCountByPictureId(this.body.Pictures[i].id);
  }
};

exports.create = function*() {
  this.verifyParams({
    title: 'string',
    description: {
      type: 'string',
      required: true,
      allowEmpty: true
    },
    tags: {
      type: 'string',
      required: true,
      allowEmpty: true
    },
    coverKey: {
      type: 'string',
      required: false,
      allowEmpty: false
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

  var _tArray = [];
  if (this.request.body.tags !== '') {
    var tags = this.request.body.tags.split(',');
    for (var i = 0; i < tags.length; i++) {
      var _t = yield models.Tag.findOrCreate({
        where: {
          name: tags[i]
        }
      });
      _tArray.push(_t[0]);
    }
  }
  yield album.setTags(_tArray);

  this.body = album.toJSON();
};

exports.update = function*() {
  this.verifyParams({
    id: 'id',
    title: {
      type: 'string',
      required: false
    },
    description: {
      type: 'string',
      required: false,
      allowEmpty: true
    },
    coverKey: {
      type: 'string',
      required: false,
      allowEmpty: false
    },
    tags: {
      type: 'string',
      required: false,
      allowEmpty: true
    },
    isShare: {
      type: 'bool',
      required: false
    },
    isPublic: {
      type: 'bool',
      required: false
    },
    isShowRawInfo: {
      type: 'bool',
      required: false
    },
    allowLike: {
      type: 'bool',
      required: false
    },
    allowComment: {
      type: 'bool',
      required: false
    }
  });

  var album = yield models.Album.find({
    paranoid: true,
    where: {
      id: this.params.id,
      isBlocked: false,
      UserId: this.session.user.id
    }
  });

  if (!album) {
    return this.body = {
      statusCode: 404,
      message: '相册不存在'
    };
  }

  var data = utils.getUpdateData(this.request.body, [
    ['title', 'string'],
    ['description', 'string'],
    ['isShare', 'bool'],
    ['isPublic', 'bool'],
    ['isShowRawInfo', 'bool'],
    ['allowLike', 'bool'],
    ['allowComment', 'bool'],
  ]);

  //如果为非共享，则一定为非公开
  if (!data.isShare) {
    data.isPublic = false;
  }

  var _tArray = [];
  if (this.request.body.tags && this.request.body.tags !== '') {
    var tags = this.request.body.tags.split(',');
    for (var i = 0; i < tags.length; i++) {
      var _t = yield models.Tag.findOrCreate({
        where: {
          name: tags[i]
        }
      });
      _tArray.push(_t[0]);
    }

  }
  yield album.setTags(_tArray);

  yield album.updateAttributes(data);

  this.body = album.toJSON();
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id'
  });

  var _result = yield models.Album.destroy({
    where: {
      id: this.params.id,
      isBlocked: false,
      UserId: this.session.user.id
    }
  });

  if (_result === 0) {
    return this.body = {
      statusCode: 404,
      message: '相册不存在'
    };
  }

  //删除相册的同时，删除相册中的照片和动态
  yield models.Action.destroy({
    where: {
      AlbumId: this.params.id
    }
  });
  yield models.Picture.destroy({
    where: {
      AlbumId: this.params.id
    }
  });
};