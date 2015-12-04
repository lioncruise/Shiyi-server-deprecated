'use strict';

const moment = require('moment');

//故事
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Story', {
  }, {
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
