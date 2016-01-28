'use strict';

const moment = require('moment');
const config = require('../../config');
const modelUtils = require('../modelUtils');

//相册标签
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tag', {
    name: {
      type: 'VARCHAR(185)',
    },
    tagCoverStoreKey: {
      type: 'VARCHAR(185)',
      allowNull: false,
      defaultValue: config.defaultPictureKey,
    },
    publicAlbumsCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    indexes: [{
      fields: ['id'],
    },
    {
      fields: ['name'],
    },
    ],
    getterMethods: {
      tagCoverDownloadUrl() {
        return modelUtils.getUrlFunction(this.tagCoverStoreKey);
      },
    },
    freezeTableName: true,
    tableName: 'tags',
  });
};
