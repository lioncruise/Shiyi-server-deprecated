'use strict';

const models = require('../../db').models;
const utils = require('../../utils');

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

      //TODO: 添加User
    });
  }

  if (this.query.isWithLikes === 'true') {
    include.push({
      model: models.Like,

      //TODO: 添加User
    });
  }

  const memory = yield models.Memory.find({
    paranoid: true,
    where: {
      id: this.params.id,
    },
    include,
  });

  if (!memory) {
    return this.body = {
      statusCode: 404,
      message: '记忆不存在',
    };
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
      required: true,
      allowEmpty: true,
    },
    position: {
      type: 'string',
      required: true,
      allowEmpty: true,
    },
    AlbumId: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
  });

  const memory = yield models.Memory.create(Objcet.assign(this.request.body, {
    UserId: this.session.user.id,
  }));

  this.body = memory.toJSON();
};

exports.destroy = function*() {
  this.verifyParams({
    id: 'id',
  });

  //删除与记忆相关的信息
  //TODO:

  const result = yield models.Album.destroy({
    where: {
      id: this.params.id,
      CreatorId: this.session.user.id,
    },
  });

  if (result === 0) {
    return this.body = {
      statusCode: 404,
      message: '删除失败',
    };
  }
};
