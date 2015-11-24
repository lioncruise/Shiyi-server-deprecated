'use strict';

//记忆
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Memory', {
    content: {
      type: DataTypes.STRING,
    },
    gps: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    likesCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    commentsCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  }, {
    paranoid: true,
    indexes: [],
  });
};
