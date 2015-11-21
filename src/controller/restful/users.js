'use strict';

const models = require('../../db').models;
const utils = require('../../utils');

exports.show = function*() {
  this.verifyParams({
    id: 'id',
    isWithAlbums: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
    isWithActions: {
      type: 'bool',
      required: false,
      allowEmpty: false,
    },
  });

  const include = [];
  if (this.query.isWithAlbums === 'true') {
    include.push({
      model: models.Album,
      as: 'ownAlbums',
    });
  }

  if (this.query.isWithActions === 'true') {
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
    this.body = {
      statusCode: 404,
      message: '用户不存在',
    };
    return;
  }

  this.body = user.toJSON();
};
