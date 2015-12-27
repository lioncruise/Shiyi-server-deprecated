'use strict';

const moment = require('moment');

//相册标签
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tag', {
    name: {
      type: 'VARCHAR(248)',
    },
  }, {
    engine: 'MYISAM',
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
