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
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    indexes: [{
      fields: ['phone', 'isBlocked', 'isDeleted', 'password']
    }, {
      fields: ['hometown', 'phone', 'isBlocked', 'isDeleted', 'gender', 'password']
    }, {
      fields: ['birthday', 'phone', 'isBlocked', 'isDeleted', 'gender', 'password']
    }, {
      fields: ['nickname', 'isBlocked', 'isDeleted', 'password']
    }, {
      fields: ['wechatToken', 'isBlocked', 'isDeleted']
    }, {
      fields: ['weiboToken', 'isBlocked', 'isDeleted']
    }, {
      fields: ['qqToken', 'isBlocked', 'isDeleted']
    }, {
      fields: ['id']
    }]
  });
};