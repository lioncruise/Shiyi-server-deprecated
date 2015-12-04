'use strict';

const moment = require('moment');

//用户反馈
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Feedback', {
    content: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {
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
