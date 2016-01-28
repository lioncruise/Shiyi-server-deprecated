'use strict';

const models = require('../../db').models;
const ejs = require('ejs');
const path = require('path');
const utils = require('../../utils');
const sequelize = require('sequelize');

exports.show = function*() {
  this.verifyParams({
    id: 'id',
  });

  const daily = yield models.Daily.findById(this.params.id);

  if (!daily) {
    this.body = utils.template('notFound', {
      message: '日报不存在',
    });
    return;
  }

  //更新浏览量
  yield daily.update({
    viewsCount: sequelize.literal('viewsCount + 1'),
  });

  this.body = utils.template('daily', daily);
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
    attributes: {
      exclude: ['content'],
    },
    limit: 5,
  });

  this.body = dailies.map((daily) => daily.toJSON());
};
