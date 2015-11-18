'use strict';

//动态
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Action', {
    type: {
      type: DataTypes.ENUM('upload', 'new', 'open', 'follow', 'estory'),
      allowNull: false,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    paranoid: true,
    indexes: [],
  });
};
