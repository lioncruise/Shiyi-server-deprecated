'use strict';

//举报
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Report', {
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'pass', 'deny'],
      defaultValue: 'pending',
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
      },
    },
  }, {
    indexes: [],
  });
};
