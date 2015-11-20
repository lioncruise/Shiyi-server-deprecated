'use strict';

const models = require('../db').models;

exports.createAction = function*(action) {
  return yield models.Acion.create(action);
};

exports.deleteAction = function*(actionWhereParameter) {
  return yield models.Acion.destroy({
    where: actionWhereParameter,
  });
};
