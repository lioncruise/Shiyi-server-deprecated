'use strict';

var sequelize = require('sequelize');

module.exports = sequelize.define('Comment', {
    content: {
        type: DataTypes.STRING
    }
});
