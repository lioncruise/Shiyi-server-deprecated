'use strict';

//相册和标签的多对多关系
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AlbumTag', {
    AlbumId: {
      type: DataTypes.INTEGER
    },
    TagId: {
      type: DataTypes.INTEGER
    }
  }, {
    indexes: []
  });
};