'use strict';

//推送
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notification', {
    content: {
      type: DataTypes.STRING,
    },
  }, {
    indexes: [],
  });
};
