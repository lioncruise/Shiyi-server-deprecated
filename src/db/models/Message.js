'use strict';

const moment = require('moment');

//私信
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Message', {
    type: {
      type: DataTypes.ENUM(
        'broadcast', //推送通知
        'message' //用户间的私信
      ),
    },
    content: {
      type: 'VARCHAR(185)',
    },
  }, {
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
    freezeTableName: true,
    tableName: 'messages',
  });
};
