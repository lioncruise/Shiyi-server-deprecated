'use strict';

var utils = require('../../utils');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        is: utils.phoneRegExp
      }
    },
    nickname: {
      type: DataTypes.STRING,
      validate: {
        len: [2,10]
      }
    },
    password: { //前后端密码强度验证
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6,16]
      }
    },
    gender: {
      type: DataTypes.ENUM('F', 'M'),
      allowNull: false
    },
    birthday: {
      type: DataTypes.STRING
    },
    hometown: {
      type: DataTypes.STRING
    },
    motto: {
      type: DataTypes.STRING,
      validate: {
        len: [0,50]
      }
    },
    avatarUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    wechatToken: {
      type: DataTypes.STRING
    },
    weiboToken: {
      type: DataTypes.STRING
    },
    qqToken: {
      type: DataTypes.STRING
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
};