'use strict';

const models = require('../../db').models;
const utils = require('../../utils');

exports.show = function*() {
  this.verifyParams({
    id: 'id',
    isWithAlbum: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
    isWithAction: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
  });

  const include = [];
  if (this.query.isWithAlbum === 'true') {
    include.push({
      model: models.Album,
      as: 'ownAlbums',
    });
  }

  if (this.query.isWithAction === 'true') {
    include.push({
      model: models.Action,
    });
  }

  const user = yield models.User.find({
    paranoid: true,
    where: {
      id: this.params.id,
    },
    include,
  });

  if (!user) {
    return this.body = {
      statusCode: 404,
      message: '用户不存在',
    };
  }

  this.body = user.toJSON();
};
