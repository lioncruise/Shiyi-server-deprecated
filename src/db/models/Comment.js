'use strict';

//评论
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    content: {
      type: DataTypes.STRING,
    },
  }, {
    paranoid: true,
    indexes: [],
  });
};
