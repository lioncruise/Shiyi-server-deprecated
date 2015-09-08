'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Action', {
    content: {
      type: DataTypes.STRING
    },
    likeNum: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    gps: {
      type: DataTypes.STRING
    },
    position: {
      type: DataTypes.STRING
    }
  });
};