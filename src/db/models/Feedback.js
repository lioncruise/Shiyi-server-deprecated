'use strict';

const moment = require('moment');

//用户反馈
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Feedback', {
    content: {
      type: 'VARCHAR(248)',
    },
  }, {
    engine: 'MYISAM',
    timestamps: true,
    updatedAt: false,
    indexes: [],
    getterMethods: {
      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },
    },
    freezeTableName: true,
    tableName: 'feedbacks',
  });
};
