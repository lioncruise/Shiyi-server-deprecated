'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const albumsRestfulController = require('./albums');

exports.show = function*() {
  this.verifyParams({
    id: 'id',
    isWithAlbum: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
    isWithMemories: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
    isWithUser: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
  });

  const include = [];
  if (this.query.isWithAlbum === 'true') {
    include.push({
      model: models.Album,
      include: [{
        model: models.Tag,
      },
      ],
    });
  }

  if (this.query.isWithMemories === 'true') {
    include.push({
      model: models.Memory,
    });
  }

  if (this.query.isWithUser === 'true') {
    include.push({
      model: models.User,
    });
  }

  const picture = yield models.Picture.find({
    paranoid: true,
    where: {
      id: this.params.id,
    },
    include,
  });

  if (!picture) {
    return this.body = {
      statusCode: 404,
      message: '图片不存在',
    };
  }

  this.body = picture.toJSON();
  if (this.body.Album) {
    this.body.Album = albumsRestfulController.setAlbumTags(this.body.Album);
  }
};

exports.create = function*() {
  this.verifyParams({
    storeKey: {
      type: 'string',
      required: true,
      allowEmpty: false,
    },
    type: {
      type: 'enum',
      values: ['picture', 'video'],
      required: false,
      allowEmpty: false,
    },
    AlbumId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
    MemoryId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
  });

  const picture = yield models.Picture.create(Objcet.assign(this.request.body, {
    UserId: this.session.user.id,
  }));

  this.body = picture.toJSON();
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id',
  });

  //删除与图片相关的信息
  //TODO:

  const result = yield models.Picture.destroy({
    where: {
      id: this.params.id,
      UserId: this.session.user.id,
    },
  });

  if (result === 0) {
    return this.body = {
      statusCode: 404,
      message: '删除失败',
    };
  }
};
