'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Like', {
    type: {
      type: DataTypes.STRING
    }
  }, {
    indexes: [{
      fields: ['ActionId', 'createdAt', 'id']
    }, {
      fields: ['PictureId', 'createdAt', 'id']
    }, {
      fields: ['id']
    }],
    classMethods: {
      getLikeCountByActionId: function*(actionId) {
        return yield this.count({
          where: {
            ActionId: actionId
          }
        });
      },
      getLikeCountByPictureId: function*(pictureId) {
        return yield this.count({
          where: {
            PictureId: pictureId
          }
        });
      }
    }
  });
};