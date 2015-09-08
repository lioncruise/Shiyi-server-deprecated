'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Report', {
    status: {
      type: DataTypes.STRING
    }
  });
};