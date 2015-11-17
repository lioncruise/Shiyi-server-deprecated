'use strict';

//相册和用户的多对多关系
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AlbumUser', {
    AlbumId: {
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.ENUM('collaborate', 'follow'),
      allowNull: false
    }
  }, {
    indexes: []
  });
};