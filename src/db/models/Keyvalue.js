'use strict';

//键值
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Keyvalue', {
    key: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
  }, {
    indexes: [],
  });
};
