'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');
const config = require('../config');
const modelUtils = require('../db/modelUtils');

router.get('/albumRanklist', function*() {
  this.verifyParams({
    tag: {
      type: 'string',
      required: false,
    },
    offset: {
      type: 'id',
      required: false,
      allowEmpty: false,
    },
    limit: {
      type: 'id',
      required: false,
      allowEmpty: false,
    },
  }, this.query);

  const limit = (this.query.limit && Number.parseInt(this.query.limit) <= 50) ? Number.parseInt(this.query.limit) : 50;
  const offset = this.query.offset ? Number.parseInt(this.query.offset) : 0;

  const where = {
    isPublic: 'public',
  };

  if (this.query.tag) {
    const tag = yield models.Tag.find({
      where: {
        name: this.query.tag,
      },
    });
    if (!tag) {
      this.body = [];
      return;
    }

    const albumIds = (yield models.AlbumTag.findAll({
      where: {
        TagId: tag.id,
      },
    })).map((albumTag) => albumTag.AlbumId);

    where.id = {
      $in: albumIds,
    };
  }

  this.body = yield models.Album.findAll({
    paranoid: true,
    order: [
      ['viewsCount', 'DESC'],
    ],
    where: where,
    limit,
    offset,
  });

  this.body = this.body.map((album) => album.toJSON());
});
