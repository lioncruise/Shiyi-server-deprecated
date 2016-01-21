'use strict';

const config = require('../../config');
const modelUtils = require('../modelUtils');
const moment = require('moment');

//用户
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    phone: {
      type: 'VARCHAR(185)',
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: modelUtils.phoneRegExp,
      },
    },
    nickname: {
      type: 'VARCHAR(185)',
      validate: {
        len: [1, 20],
      },
    },
    password: {
      type: 'VARCHAR(185)',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      get() {
        return undefined;
      },
    },
    gender: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false,
    },
    birthday: {
      type: 'VARCHAR(185)',
    },
    hometown: {
      type: 'VARCHAR(185)',
    },
    motto: {
      type: 'VARCHAR(185)',
      validate: {
        len: [0, 100],
      },
    },
    avatarStoreKey: {
      type: 'VARCHAR(185)',
      allowNull: false,
      defaultValue: config.defaultPictureKey,
    },
    backgroundStoreKey: {
      type: 'VARCHAR(185)',
      allowNull: false,
      defaultValue: config.defaultBackgroundPictureKey,
    },
    followersCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    followAlbumsCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    fansCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    wechatToken: {
      type: 'VARCHAR(185)',
    },
    weiboToken: {
      type: 'VARCHAR(185)',
    },
    qqToken: {
      type: 'VARCHAR(185)',
    },
    device: {
      type: 'VARCHAR(185)',
    },
    getuiCid: {
      type: 'VARCHAR(185)',
    },
    ip: {
      type: 'VARCHAR(185)',
      allowNull: true,
      validate: {
        isIP: true,
      },
    },
    type: {
      type: DataTypes.ENUM('user', 'crowdfunding', 'vip'),
      allowNull: false,
      defaultValue: 'user',
    },
  }, {
    charset: 'utf8mb4',
    paranoid: true,
    getterMethods: {
      avatarDownloadUrl() {
        return modelUtils.getUrlFunction(this.avatarStoreKey);
      },

      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },

      updatedTimestamp: function() {
        return moment(this.updateAt).unix();
      },
    },
    indexes: [],
    freezeTableName: true,
    tableName: 'users',
  });
};
