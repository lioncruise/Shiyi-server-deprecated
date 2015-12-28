'use strict';

const moment = require('moment');

//记忆
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Memory', {
    content: {
      type: 'VARCHAR(248)',
    },
    gps: {
      type: 'VARCHAR(248)',
    },
    position: {
      type: 'VARCHAR(248)',
    },
    likesCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    commentsCount: { //冗余数据，减少跨表联合查询
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  }, {
    engine: 'MYISAM',
    charset: 'utf8mb4',
    paranoid: true,
    indexes: [],
    getterMethods: {
      createdTimestamp: function() {
        return moment(this.createdAt).unix();
      },

      updatedTimestamp: function() {
        return moment(this.updateAt).unix();
      },
    },
    freezeTableName: true,
    tableName: 'memories',
  });
};
