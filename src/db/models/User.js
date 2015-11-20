'use strict';

const config = require('../../config');
const modelUtils = require('../modelUtils');

//用户
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: modelUtils.phoneRegExp,
      },
    },
    nickname: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 20],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gender: {
      type: DataTypes.ENUM('F', 'M'),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.STRING,
    },
    hometown: {
      type: DataTypes.STRING,
    },
    motto: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 100],
      },
    },
    avatarStoreKey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: config.defaultPictureKey,
    },
    wechatToken: {
      type: DataTypes.STRING,
    },
    weiboToken: {
      type: DataTypes.STRING,
    },
    qqToken: {
      type: DataTypes.STRING,
    },
    device: {
      type: DataTypes.STRING,
    },
    androidId: {
      type: DataTypes.STRING,
    },
    appleId: {
      type: DataTypes.STRING,
    },
    ip: {
      type: DataTypes.STRING,
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
    paranoid: true,
    getterMethods: {
      avatarDownloadUrl() {
        return modelUtils.getUrlFunction(this.avatarKey);
      },
    },
    indexes: [],
  });
};
