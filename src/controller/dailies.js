'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');

// monitor接口，推送日报信息，eg. /sendDaily?id=2
router.get('/sendDaily', function*() {
  this.verifyParams({
    id: {
      type: 'id',
      required: true,
      allowEmpty: false,
    },
  }, this.query);

  // todo 验证monitor身份

  const daily = yield models.Daily.find({
    where: {
      id: this.query.id,
    },
  });

  if (!daily) {
    this.body = {
      statusCode: 404,
      message: '日报不存在',
    };
  } else {
    this.body = yield utils.notification.sendNotificationToApp(daily.title, daily.description);
  }

});
