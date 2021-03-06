'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');

//分享相册的html页面
router.get('/memoryShareHtml', function*() {
  this.verifyParams({
    id: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
  }, this.query);

  const memory = yield models.Memory.find({
    paranoid: true,
    where: {
      id: this.query.id,
    },
    include: [models.Album, models.User],
  });

  if (!memory || memory.Album.isPublic !== 'public') {
    this.redirect('/appShareHtml');
    return;
  }

  const pictures = yield models.Picture.findAll({
    paranoid: true,
    where: {
      MemoryId: this.query.id,
    },
    order: [
      ['createdAt', 'DESC'],
    ],
    limit: 9,
  });

  this.body = yield utils.template('memoryShare', { memory, pictures });
});
