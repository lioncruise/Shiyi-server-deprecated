'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const sequelize = require('sequelize');

exports.show = function*() {
  this.verifyParams({
    id: 'id',
  });
  const daily = yield models.Daily.find({
    where: {
      id: this.params.id,
    },
  });
  if (!daily) {
    // todo: 返回404的html页面
    this.body = {
      statusCode: 404,
      message: '日报不存在',
    };
    return;
  }
  // todo: 返回带title的html页面，使用模板。
  this.body = daily.content;
};

exports.index = function*() {
  const dailies = yield models.Daily.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
    include: [{
      model: models.User,
    }, {
      model: models.Album,
    },
    ],
    attributes: { exclude: ['content'] },
    limit: 5,
  });

  this.body = dailies.map((daily) => daily.toJSON());
};
