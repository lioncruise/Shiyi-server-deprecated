'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Report', {
    status: {
      type: DataTypes.STRING
    }
  }, {
    indexes: [{
      fields: ['UserId', 'status', 'createdAt', 'id']
    }, {
      fields: ['AlbumId', 'status', 'createdAt', 'id']
    }, {
      fields: ['PictureId', 'status', 'createdAt', 'id']
    }, {
      fields: ['ReporterId', 'status', 'createdAt', 'id']
    }, {
      fields: ['id']
    }]
  });
};