'use strict';

//私信
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Message', {
    type: {
      type: DataTypes.ENUM('comment', /*评论*/
        'like', /*点赞*/
        'broadcast', /*推送通知*/
        'letter' /*用户间的私信*/
      )
    },
    content: {
      type: DataTypes.STRING
    }
  }, {
    indexes: []
  });
};