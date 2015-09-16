'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Album', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    coverUrl: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    isShare: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isShowRawInfo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    allowLike: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    allowComment: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
};