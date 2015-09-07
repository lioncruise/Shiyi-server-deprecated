'use strict';

var sequelize = require('sequelize');

module.exports = sequelize.define('Like', {
    type: {
        type: DataTypes.STRING
    }
});

