'use strict';

//用户反馈
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Feedback', {
    content: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    indexes: []
  });
};