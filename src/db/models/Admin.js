'use strict';

const moment = require('moment');

//管理员
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Admin', {
    username: {
      type: 'VARCHAR(185)',
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    nickname: {
      type: 'VARCHAR(185)',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: 'VARCHAR(185)',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: 'VARCHAR(185)',
      allowNull: false,
      defaultValue: 'user',
    },
  }, {
    charset: 'utf8mb4',
    indexes: [],
    getterMethods: {
      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },

      updatedTimestamp: function() {
        return moment(this.updateAt).unix();
      },
    },
    freezeTableName: true,
    tableName: 'admins',
  });
};
