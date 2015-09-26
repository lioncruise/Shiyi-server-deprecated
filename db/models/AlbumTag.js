'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AlbumTag', {
    AlbumId: {
      type: DataTypes.INTEGER
    },
    TagId: {
      type: DataTypes.INTEGER
    }
  }, {
    indexes: [{
      fields: ['AlbumId', 'TagId']
    }, {
      fields: ['TagId', 'AlbumId']
    }]
  });
};