'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const sequelize = require('sequelize');
const fs = require('fs');

const dailyTemplate = fs.readFileSync('./static/templates/daily.html');
const notFoundTemplate = fs.readFileSync('./static/templates/404.html');
/* jshint ignore:start */
const dailyTemplateExecute = new Function('title', 'description', 'content', 'return `' + dailyTemplate + '`');
const notFoundTemplateExecute = new Function('message', 'return `' + notFoundTemplate + '`');

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
    this.body = notFoundTemplateExecute('日报不存在');
    return;
  }

  this.body = dailyTemplateExecute(daily.title, daily.description, daily.content);
};
/* jshint ignore:end */

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
