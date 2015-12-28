'use strict';

const moment = require('moment');

//点赞
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Like', {
    type: {
      type: 'VARCHAR(185)',
    },
  }, {
    indexes: [],
    classMethods: {
      *getLikeCountByMemoryId(memoryId) {
        return yield this.count({
          where: {
            MemoryId: memoryId,
          },
        });
      },
    },
    getterMethods: {
      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },

      updatedTimestamp: function() {
        return moment(this.updateAt).unix();
      },
    },
    freezeTableName: true,
    tableName: 'likes',
  });
};
