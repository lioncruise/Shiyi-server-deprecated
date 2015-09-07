'use strict';

var sequelize = require('sequelize');

module.exports = sequelize.define('Message', {
    type: {
        type: DataTypes.ENUM('C',/*评论*/ 'L',/*点赞*/ 'B'/*推送通知*/)
    }
});

