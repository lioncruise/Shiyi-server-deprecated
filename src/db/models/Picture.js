'use strict';

const moment = require('moment');
const modelUtils = require('../modelUtils');

//图片或小视频
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Picture', {
    pictureKey: {
      type: DataTypes.STRING,
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
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    paranoid: true,
    getterMethods: {
      pictureUrl() {
        return modelUtils.getUrlFunction(this.pictureKey);
      },
    },
    indexes: [],
    classMethods: {
      *getPictureCountByAlbumId(albumId) {
        return yield this.count({
          // paranoid: true, //count函数不需要添加paranoid参数
          where: {
            AlbumId: albumId,
            isBlocked: false,
          },
        });
      },
    },
  });
};
