'use strict';

//相册标签
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
    },
  }, {
    indexes: [],
  });
};
