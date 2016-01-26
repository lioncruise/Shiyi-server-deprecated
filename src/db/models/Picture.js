'use strict';

const moment = require('moment');
const modelUtils = require('../modelUtils');

//图片或小视频
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Picture', {
    storeKey: {
      type: 'VARCHAR(185)',
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('picture', 'video'),
      defaultValue: 'picture',
      allowNull: false,
    },
    shareNum: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    paranoid: true,
    getterMethods: {
      thumbnailDownloadUrl() {
        return modelUtils.getThumbnailUrlFunction(this.storeKey);
      },

      downloadUrl() {
        return modelUtils.getUrlFunction(this.storeKey);
      },

      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },

      updatedTimestamp: function() {
        return moment(this.updateAt).unix();
      },
    },
    indexes: [{
      fields: ['id'],
    },
    {
      fields: ['MemoryId'],
    },
    {
      fields: ['AlbumId'],
    },
    {
      fields: ['UserId'],
    },
    ],
    classMethods: {
      *getPictureCountByAlbumId(albumId) {
        return yield this.count({
          // paranoid: true, //count函数不需要添加paranoid参数
          where: {
            AlbumId: albumId,
          },
        });
      },
    },
    freezeTableName: true,
    tableName: 'pictures',
  });
};
