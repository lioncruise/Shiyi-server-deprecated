'use strict';

const config = require('../../config');
const modelUtils = require('../modelUtils');
const moment = require('moment');

//用户
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    phone: {
      type: 'VARCHAR(248)',
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: modelUtils.phoneRegExp,
      },
    },
    nickname: {
      type: 'VARCHAR(248)',
      validate: {
        len: [1, 20],
      },
    },
    password: {
      type: 'VARCHAR(248)',
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
      type: 'VARCHAR(248)',
    },
    hometown: {
      type: 'VARCHAR(248)',
    },
    motto: {
      type: 'VARCHAR(248)',
      validate: {
        len: [0, 100],
      },
    },
    avatarStoreKey: {
      type: 'VARCHAR(248)',
      allowNull: false,
      defaultValue: config.defaultPictureKey,
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
      type: 'VARCHAR(248)',
    },
    weiboToken: {
      type: 'VARCHAR(248)',
    },
    qqToken: {
      type: 'VARCHAR(248)',
    },
    device: {
      type: 'VARCHAR(248)',
    },
    getuiCid: {
      type: 'VARCHAR(248)',
    },
    ip: {
      type: 'VARCHAR(248)',
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
    engine: 'MYISAM',
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
