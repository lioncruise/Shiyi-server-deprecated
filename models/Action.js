'use strict';

var sequelize = require('sequelize');

module.exports = sequelize.define('Action', {
    content: {
        type: DataTypes.STRING
    },
    likeNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    gps: {
        type: DataTypes.STRING
    },
    position: {
        type: DataTypes.STRING
    }
});

