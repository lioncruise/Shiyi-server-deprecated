'use strict';

var utils = require('../../utils');
var config = require('../../config');
var modelUtils = require('./modelUtils');

//用户
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
        len: [2, 10]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
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
        len: [0, 50]
      }
    },
    avatarKey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: config.defaultPictureKey
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
    },
    type: {
      type: DataTypes.ENUM('user', 'crowdfunding', 'vip'),
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    paranoid: true,
    getterMethods: {
      avatarUrl: function() {
        return modelUtils.getUrlFunction(this.avatarKey);
      }
    },
    indexes: []
  });
};