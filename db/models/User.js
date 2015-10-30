'use strict';

var utils = require('../../utils');
var config = require('../../config');
var modelUtils = require('./modelUtils');

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
    password: { //前后端密码强度验证
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
      type: DataTypes.ENUM('user', 'crowdfunding', 'member'),
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
    indexes: [{
      fields: ['type', 'isBlocked', 'phone', 'password']
    }, {
      fields: ['phone', 'isBlocked', 'password']
    }, {
      fields: ['hometown', 'phone', 'isBlocked', 'gender', 'password']
    }, {
      fields: ['birthday', 'phone', 'isBlocked', 'gender', 'password']
    }, {
      fields: ['nickname', 'isBlocked', 'password']
    }, {
      fields: ['wechatToken', 'isBlocked']
    }, {
      fields: ['weiboToken', 'isBlocked']
    }, {
      fields: ['qqToken', 'isBlocked']
    }, {
      fields: ['id']
    }]
  });
};