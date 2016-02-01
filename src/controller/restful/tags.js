'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const sequelize = require('sequelize');
const modelUtils = require('../../db/modelUtils');

// get /tags 按热度返回tags列表
exports.index = function*() {
  let tags = yield models.Tag.findAll({
    attributes: {
      exclude: ['createdTimestamp', 'updatedTimestamp', 'createdAt', 'updatedAt'],
    },
    limit: 20,
    order: [
      ['publicAlbumsCount', 'DESC'],
    ],
    where: {
      publicAlbumsCount: {
        $gt: 0,
      },
    },
  });

  this.body = tags;
};
