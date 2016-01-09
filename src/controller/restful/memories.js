'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const sequelize = require('sequelize');

exports.show = function*() {
  this.verifyParams({
    id: 'id',
    isWithPictures: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
    isWithComments: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
    isWithLikes: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
  });

  const include = [];

  if (this.query.isWithPictures === 'true') {
    include.push({
      model: models.Picture,
    });
  }

  if (this.query.isWithComments === 'true') {
    include.push({
      model: models.Comment,
      include: [{
        model: models.User,
      },
      ],
    });
  }

  if (this.query.isWithLikes === 'true') {
    include.push({
      model: models.Like,
      include: [{
        model: models.User,
      },
      ],
    });
  }

  //更新浏览量
  yield models.Memory.update({
    viewsCount: sequelize.literal('viewsCount + 1'),
  }, {
    where: {
      id: this.params.id,
    },
  });

  const memory = yield models.Memory.find({
    paranoid: true,
    where: {
      id: this.params.id,
    },
    include,
  });

  if (!memory) {
    this.body = {
      statusCode: 404,
      message: '记忆不存在',
    };
    return;
  }

  this.body = memory.toJSON();
};

exports.create = function*() {
  this.verifyParams({
    content: {
      type: 'string',
      required: true,
      allowEmpty: true,
    },
    gps: {
      type: 'string',
      required: false,
      allowEmpty: false,
    },
    position: {
      type: 'string',
      required: false,
      allowEmpty: false,
    },
    AlbumId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
  });

  const album = yield models.Album.find({
    paranoid: true,
    where: {
      id: this.request.body.AlbumId,
    },
  });

  if (!album) {
    this.body = {
      statusCode: 404,
      message: '相册不存在',
    };
    return;
  }

  const memory = yield models.Memory.create(Object.assign(this.request.body, {
    UserId: this.session.user.id,
  }));

  yield models.Album.update({
    memoriesCount: sequelize.literal('memoriesCount + 1'),
  }, {
    where:{
      id: album.id,
    },
  });

  this.body = memory.toJSON();

  //创建相关action
  if (album.isPublic !== 'private') {
    yield utils.models.createReletedAction({
      type: 'createMemory',
      MemoryId: memory.id,
      UserId: this.session.user.id,
      AlbumId: memory.AlbumId,
    });
  }
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id',
  });

  const memory = yield models.Memory.find({
    paranoid: true,
    where: {
      id: this.params.id,
      UserId: this.session.user.id,
    },
  });

  if (!memory) {
    this.body = {
      statusCode: 404,
      message: '删除失败',
    };
    return;
  }

  yield utils.models.deleteMemory(memory.id);
};
