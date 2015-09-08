'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Like', {
    type: {
      type: DataTypes.STRING
    }
  });
};