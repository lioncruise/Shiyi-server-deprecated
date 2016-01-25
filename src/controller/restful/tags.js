'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const sequelize = require('sequelize');
const modelUtils = require('../../db/modelUtils');

// get /tags 按热度返回tags列表
exports.index = function*() {
  let tags = yield models.AlbumTag.findAll({
    attributes: {
      include: ['TagId', [sequelize.fn('count', sequelize.col('*')), 'albumsCount']],
      exclude: ['createdTimestamp', 'updatedTimestamp', 'createdAt', 'updatedAt'],
    },
    group: ['TagId'],
    include: [
      {
        model: models.Tag,
      },
    ],
  });

  tags = tags.map(function(tag) {
    tag = tag.toJSON();
    delete tag.AlbumId;
    tag.name = tag.Tag.name;
    delete tag.Tag;

    delete tag.createdTimestamp;
    delete tag.updatedTimestamp;

    //TODO: 修改tagCover
    tag.tagCoverDownloadUrl = modelUtils.getUrlFunction('default');

    return tag;
  });

  tags.sort(function(a, b) {
    return b.albumsCount - a.albumsCount;
  });

  this.body = tags;
};
