'use strict';

//动态
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Action', {
    type: {
      type: DataTypes.ENUM('createMemory', 'createAlbum', 'openAlbum', 'collaborateAlbum', 'followAlbum', 'followUser', 'estory'),
      allowNull: false,
    },
  }, {
    paranoid: true,
    indexes: [],
  });
};
