'use strict';

const moment = require('moment');

//评论
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    content: {
      type: 'VARCHAR(248)',
    },
  }, {
    engine: 'MYISAM',
    charset: 'utf8mb4',
    paranoid: true,
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
