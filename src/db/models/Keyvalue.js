'use strict';

const moment = require('moment');

//键值
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Keyvalue', {
    key: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
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
  });
};
