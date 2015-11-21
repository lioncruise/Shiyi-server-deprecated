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
    offset: {
      type: 'int',
      required: false,
      allowEmpty: false,
    },
    limit: {
      type: 'int',
      required: false,
      allowEmpty: false,
    },
  });

  const include = [];
  const limit = (this.query.limit && Number.parseInt(this.query.limit) <= 50) ? Number.parseInt(this.query.limit) : 50;
  const offset = this.query.offset ? Number.parseInt(this.query.offset) : 0;

  if (this.query.isWithAlbums === 'true') {
    include.push({
      model: models.Album,
      as: 'ownAlbums',
    });
  }

  if (this.query.isWithActions === 'true') {
    include.push({
      model: models.Action,
      include: [{
      model: models.Memory,
    }, {
      model: models.Album,
    }, {
      model: models.User,
      as: 'TargetUser',
    },
    ],
      limit,
      offset,
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
