'use strict';

//用户和用户之间的关注关系
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserUserFollow', {
    SourceUserId: {
      type: DataTypes.INTEGER,
    },
    TargetUserId: {
      type: DataTypes.INTEGER,
    },
  }, {
    indexes: [],
  });
};
