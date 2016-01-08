'use strict';

const config = require('../../config');
const modelUtils = require('../modelUtils');
const moment = require('moment');

//日报
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Daily', {
    title: {
      type: 'VARCHAR(185)',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    coverStoreKey: {
      type: 'VARCHAR(185)',
      allowNull: false,
      defaultValue: config.defaultPictureKey,
    },
    description: {
      type: 'VARCHAR(185)',
    },
    url: {
      type: 'VARCHAR(185)',
    },
    viewsCount: { //浏览量
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    indexes: [],
    getterMethods: {
      coverDownloadUrl() {
        return modelUtils.getUrlFunction(this.coverStoreKey);
      },

      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },

      updatedTimestamp: function() {
        return moment(this.updateAt).unix();
      },
    },
    freezeTableName: true,
    tableName: 'dailies',
  });
};
