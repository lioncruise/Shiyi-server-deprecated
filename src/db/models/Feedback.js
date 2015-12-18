'use strict';

const moment = require('moment');

//用户反馈
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Feedback', {
    content: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: true,
    updatedAt: false,
    indexes: [],
    getterMethods: {
      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },
    },
  });
};
