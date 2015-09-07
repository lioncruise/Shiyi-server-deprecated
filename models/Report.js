'use strict';

var sequelize = require('sequelize');

module.exports = sequelize.define('Report', {
    status: {
        type: DataTypes.STRING
    }
});

