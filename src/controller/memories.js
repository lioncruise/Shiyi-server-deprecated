'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');

//分享相册的html页面
router.get('/sharedMemory', function*() {
  this.verifyParams({
    id: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
  }, this.query);

  const memory = yield models.Memory.find({
    where:{
      id: this.query.id,
    },
  });
  // todo 公开验证
  if (!memory) {
    this.body = utils.template('notFound', {
      message: '分享的记忆不存在',
    });
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

  this.body = utils.template('memoryShare', { memory, pictures });
});
