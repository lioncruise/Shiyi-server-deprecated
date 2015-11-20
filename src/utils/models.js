'use strict';

const models = require('../db').models;
const debug = require('debug')('utils/models');

exports.createAction = function*(action) {
  debug('create new action.');
  return yield models.Action.create(action);
};

exports.deleteAction = function*(actionWhereParameter) {
  debug('delete action.');
  return yield models.Action.destroy({
    where: actionWhereParameter,
  });
};
