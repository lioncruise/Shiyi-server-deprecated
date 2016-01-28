'use strict';

const moment = require('moment');

//用户反馈
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Feedback', {
    content: {
      type: 'VARCHAR(185)',
    },
  }, {
    timestamps: true,
    updatedAt: false,
    indexes: [{
      fields: ['id'],
    }, {
      fields: ['UserId'],
    },
    ],
    getterMethods: {
      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },
    },
    freezeTableName: true,
    tableName: 'feedbacks',
  });
};
