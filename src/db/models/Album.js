'use strict';

const config = require('../../config');
const modelUtils = require('../modelUtils');
const moment = require('moment');

//相册
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Album', {
    title: {
      type: 'VARCHAR(185)',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    coverStoreKey: {
      type: 'VARCHAR(185)',
      allowNull: false,
      defaultValue: config.defaultPictureKey,
    },
    description: {
      type: 'VARCHAR(185)',
    },
    memoriesCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    picturesCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    fansCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    collaboratorsCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    likesCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    commentsCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    RecentPictureId: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    viewsCount: { //浏览量
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.ENUM('private', 'shared', 'public'),
      defaultValue: 'shared',
    },
    allowComment: {
      type: DataTypes.ENUM('none', 'collaborators', 'anyone'),
      defaultValue: 'collaborators',
    },
    isShowRawInfo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    charset: 'utf8mb4',
    paranoid: true,
    indexes: [{
      fields: ['id', { attribute: 'updatedAt', order: 'DESC' }],
    }, {
      fields: ['UserId', { attribute: 'updatedAt', order: 'DESC' }],
    }, {
      fields: ['title'], //如何让like语句使用到此索引
    }, {
      fields: [{ attribute: 'viewsCount', order: 'DESC' }],
    },
    ],
    getterMethods: {
      coverDownloadUrl() {
        return modelUtils.getUrlFunction(this.coverStoreKey);
      },

      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },

      updatedTimestamp: function() {
        return moment(this.updateAt).unix();
      },
    },
    freezeTableName: true,
    tableName: 'albums',
  });
};
