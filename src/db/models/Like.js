'use strict';

//点赞
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Like', {
    type: {
      type: DataTypes.STRING
    }
  }, {
    indexes: [],
    classMethods: {
      getLikeCountByMemoryId: function*(memoryId) {
        return yield this.count({
          where: {
            MemoryId: memoryId
          }
        });
      }
    }
  });
};