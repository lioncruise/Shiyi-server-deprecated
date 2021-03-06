'use strict';

const moment = require('moment');

//键值
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Keyvalue', {
    key: {
      type: 'VARCHAR(185)',
    },
    value: {
      type: 'VARCHAR(185)',
    },
  }, {
    charset: 'utf8mb4',
    indexes: [{
      fields: ['id'],
    }, {
      fields: ['key'],
    },
    ],
    getterMethods: {
      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },

      updatedTimestamp: function() {
        return moment(this.updateAt).unix();
      },
    },
    freezeTableName: true,
    tableName: 'keyvalues',
  });
};
