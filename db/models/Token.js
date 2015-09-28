'use strict';

var utils = require('../../utils');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Token', {
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: utils.phoneRegExp
      }
    },
    type: {
      type: DataTypes.ENUM('register', 'changePassword', 'other'),
      allowNull: false,
      defaultValue: 'other'
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    indexes: [{
      fields: ['phone', 'type', 'id']
    }, {
      fields: ['type', 'phone', 'id']
    }, {
      fields: ['id']
    }]
  });
};