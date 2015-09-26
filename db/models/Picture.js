'use strict';

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
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    indexes: [{
      fields: ['AlbumId', 'UserId', 'isBlocked', 'isDeleted', 'createdAt', 'id']
    }, {
      fields: ['ActionId', 'UserId', 'isBlocked', 'isDeleted', 'createdAt', 'id']
    }, {
      fields: ['UserId', 'isBlocked', 'isDeleted', 'createdAt', 'id']
    }, {
      fields: ['shareNum', 'isBlocked', 'isDeleted', 'createdAt', 'id']
    }, {
      fields: ['id']
    }],
    classMethods: {
      getPictureCountByAlbumId: function*(albumId) {
        return yield this.count({
          where: {
            AlbumId: albumId,
            isDeleted: false,
            isBlocked: false
          }
        });
      }
    }
  });
};