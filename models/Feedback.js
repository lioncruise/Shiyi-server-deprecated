'use strict';

var sequelize = require('sequelize');

module.exports = sequelize.define('Feedback', {
    type: {
        type: DataTypes.STRING
    }
});
