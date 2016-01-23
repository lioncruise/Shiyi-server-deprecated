'use strict';

const models = require('../../db').models;
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const sequelize = require('sequelize');

const notFoundPage = fs.readFileSync(path.join(__dirname, '../../../static/templates/notFound.html'), 'utf-8');
const dailyPage = fs.readFileSync(path.join(__dirname, '../../../static/templates/daily.html'), 'utf-8');

exports.show = function*() {
  this.verifyParams({
    id: 'id',
  });

  const daily = yield models.Daily.findById(this.params.id);

  if (!daily) {
    this.body = ejs.render(notFoundPage, {
      message: '日报不存在',
    });
    return;
  }

  this.body = ejs.render(dailyPage, daily);
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
