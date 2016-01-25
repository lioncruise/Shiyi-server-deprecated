'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const sequelize = require('sequelize');
const modelUtils = require('../../db/modelUtils');
const responseCache = require('../../cache').responseCache;

// get /tags 按热度返回tags列表
exports.index = function*() {
  if (responseCache.has('/tags')) {
    this.body = responseCache.get('/tags');
    return;
  }

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
    tag.id = tag.TagId;
    delete tag.AlbumId;
    tag.name = tag.Tag.name;
    tag.tagCoverDownloadUrl = tag.Tag.tagCoverDownloadUrl;
    delete tag.Tag;

    delete tag.createdTimestamp;
    delete tag.updatedTimestamp;

    return tag;
  });

  tags.sort(function(a, b) {
    return b.albumsCount - a.albumsCount;
  });

  this.body = tags;

  responseCache.set('/tags', this.body);
};
