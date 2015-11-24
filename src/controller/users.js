'use strict';

const router = require('../router').router;
const models = require('../db').models;
const utils = require('../utils');

const getGetUsersControllerFunction = function(modelName, sourceFieldName, TargetFieldName) {
  return function*() {
    const UserId = parseInt(this.query.userId) ? parseInt(this.query.userId) : this.session.user.id;
    const limit = (this.query.limit && Number.parseInt(this.query.limit) <= 50) ? Number.parseInt(this.query.limit) : 50;
    const offset = this.query.offset ? Number.parseInt(this.query.offset) : 0;
    const result = yield models[modelName].findAndCountAll({
      where: {
        [sourceFieldName]: UserId,
      },
      limit,
      offset,
    });

    const userIds = result.rows.map((elm) => elm[TargetFieldName]);

    const users = yield models.User.findAll({
      paranoid: true,
      where: {
        id: {
          $in: userIds,
        },
      },
    });

    this.body = users.map((user) => user.toJSON());
  };
};

//获取一个用户的关注者
router.get('/getFollowers', getGetUsersControllerFunction('UserUserFollow', 'UserId', 'TargetUserId'));

//获取一个用户的粉丝
router.get('/getFans', getGetUsersControllerFunction('UserUserFollow', 'TargetUserId', 'UserId'));
