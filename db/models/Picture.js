'use strict';
var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Picture', {
    pictureUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    shareNum: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    paranoid: true,
    indexes: [{
      fields: ['AlbumId', 'UserId', 'isBlocked', 'createdAt', 'id']
    }, {
      fields: ['ActionId', 'UserId', 'isBlocked', 'createdAt', 'id']
    }, {
      fields: ['UserId', 'isBlocked', 'createdAt', 'id']
    }, {
      fields: ['shareNum', 'isBlocked', 'createdAt', 'id']
    }, {
      fields: ['id']
    }],
    classMethods: {
      getPictureCountByAlbumId: function*(albumId) {
        return yield this.count({
          where: {
            AlbumId: albumId,
            isBlocked: false,
            deletedAt: {
              lt: moment().toISOString()
            }
          }
        });
      }
    }
  });
};