'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Picture', {
    likeNum: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    pictureUrl: {
      type: DataTypes.STRING
    },
    shareNum: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
};