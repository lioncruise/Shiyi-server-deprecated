'use strict';

const utils = require('../../utils');

//用户高危操作的token
//与用户表不关联，只用手机号作为查找主键
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Token', {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: utils.phoneRegExp,
      },
    },
    type: {
      type: DataTypes.ENUM('register', 'changePassword', 'other'),
      allowNull: false,
      defaultValue: 'other',
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    indexes: [],
  });
};
