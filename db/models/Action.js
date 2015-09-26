'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Action', {
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
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
};