'use strict';

var sequelize = require('sequelize');

module.exports = sequelize.define('Album', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    coverUrl: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    isShare: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isPublic: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    allowLike: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    allowComment: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});