'use strict';

const config = require('../../config');
const modelUtils = require('../modelUtils');
const moment = require('moment');

//相册
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Album', {
    title: {
      type: 'VARCHAR(248)',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    coverStoreKey: {
      type: 'VARCHAR(248)',
      allowNull: false,
      defaultValue: config.defaultPictureKey,
    },
    description: {
      type: 'VARCHAR(248)',
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
    engine: 'MYISAM',
    charset: 'utf8mb4',
    paranoid: true,
    indexes: [],
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
