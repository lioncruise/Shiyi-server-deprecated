'use strict';

//记忆
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Memory', {
    content: {
      type: DataTypes.STRING
    },
    gps: {
      type: DataTypes.STRING
    },
    position: {
      type: DataTypes.STRING
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    paranoid: true,
    indexes: []
  });
};