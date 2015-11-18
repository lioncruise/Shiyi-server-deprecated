'use strict';

//相册和用户的维护者多对多关系
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AlbumUserCollaborate', {
    AlbumId: {
      type: DataTypes.INTEGER,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
  }, {
    indexes: [],
  });
};
