'use strict';

var router = require('../router').router;
var models = require('../db').models;
var utils = require('../utils');

// 获取一个人的全部动态
router.get('/getActions', function*() {
  const UserId = parseInt(this.query.userId) ? parseInt(this.query.userId) : this.session.user.id;
  const include = [];
  if (this.query.isWithDetail === 'true') {
    include.push({
      model: models.Memory,
    }, {
      model: models.Album,
    }, {
      model: models.User,
      as: 'TargetUser',
    });
  }

  const actions = yield models.Action.findAll({
    paranoid: true,
    where: {
      UserId,
    },
    include,
  });

  this.body = actions.map((action) => action.toJSON());
});
