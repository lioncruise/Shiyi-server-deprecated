'use strict';

var sequelize = require('sequelize');

var User = require('./User');
var Album = require('/Album');
var Tag = require('./Tag');
var Action = require('./Action');
var Picture = require('./Picture');
var Like = require('./Like');
var Message = require('./Message');
var Comment = require('./Comment');


module.exports = {
  User: User, //用户
  Album: Album, //相册
  Tag: Tag, //相册标签
  Action: Action, //上传行为
  Picture: Picture, //图片
  Like: Like, //点赞
  Message: Message, //消息
  Comment: Comment, //评论
  Report: Report, //举报
  Feedback: Feedback //用户反馈
};

User.hasMany(Album);
User.hasMany(Action);
User.hasMany(Message);

Album.belongsTo(User);
Album.belongsToMany(Tag);
Album.hasMany(Picture);
Album.belongsToMany(User);

Action.belongsTo(User);
Action.belongsTo(Album);
Action.hasMany(Picture);
Action.hasMany(Like);

Picture.belongsTo(User);
Picture.belongsTo(Album);
Picture.belongsTo(Action);
Picture.hasMany(Like);

Like.belongsTo(User);
Like.belongsTo(Picture);
Like.belongsTo(Action);

Message.belongsTo(User);
Message.belongsTo(Like);
Message.belongsTo(Comment);
Message.belongsTo(Message, {as: 'OrignalMessage', foreignKey: 'OrignalMessageId'});

Report.belongsTo(User, {as: 'Reporter', foreignKey: 'ReporterId'});
Report.belongsTo(Picture);
Report.belongsTo(Album);
Report.belongsTo(User);

Feedback.belongsTo(User);