'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const sequelize = require('sequelize');

exports.show = function*() {
  //TODO: 渲染HTML页面返回
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
    limit: 5,
  });

  this.body = dailies.map((daily) => daily.toJSON());
};
