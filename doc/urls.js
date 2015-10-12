'use strict';
var utility = require('utility');

var urls = [{
  url: '/getSeccode',
  method: 'post',
  input: [{
    phone: '13009865000',
    type: 'register'
  }, {
    phone: '13000000003',
    type: 'changePassword'
  }]
}, {
  url: '/changePassword',
  method: 'post',
  input: {
    phone: '15555555551',
    password: '123123',
    token: utility.md5('eeeee')
  }
}, {
  url: '/register',
  method: 'post',
  input: {
    phone: '15555555550',
    nickname: '一个很好的昵称',
    password: '123456789',
    gender: 'M',
    motto: "Let's go!",
    token: utility.md5('eeeee')
  }
}, {
  url: '/login',
  method: 'post',
  input: {
    phone: '13000000000',
    password: utility.md5('123456')
  }
}, {
  url: '/logout',
  method: 'get'
}, {
  url: '/update',
  method: 'put',
  note: '传上来的input中可以任意包含一下的input，一个或者任意多个，改啥传啥，不需要全部都包含',
  input: {
    nickname: '我是666',
    password: '222222222',
    motto: '就是666.',
    gender: 'F',
    birthday: '1999-09-09',
    hometown: '黑龙江 哈尔滨'
  }
}, {
  url: '/getVersion?type=android',
  method: 'get'
}, {
  url: '/getVersion?type=ios',
  method: 'get'
}, {
  url: '/actions/1',
  method: 'get'
}, {
  url: '/actions',
  method: 'post',
  input: {
    content: '这是一条动态呦~',
    gps: 'gps',
    position: 'position',
    UserId: 1,
    AlbumId: 1
  }
}, {
  url: '/albums/1',
  method: 'get'
}, {
  url: '/albums',
  method: 'post',
  input: {
    title: '这是一个新建的相册',
    description: '今天天气不错',
    tags: '天气,哈工大,风景',
    isShare: true,
    isPublic: true,
    isShowRawInfo: true,
    allowLike: true,
    allowComment: true
  }
}, {
  url: '/albums/1',
  method: 'put',
  input: {
    title: '标题改改',
    description: '描述改改',
    tags: '改',
    isShare: false,
    isPublic: false
  }
}, {
  url: '/albums/1',
  method: 'delete'
}, {
  url: '/albumUsers',
  method: 'post',
  input: [{
    AlbumId: '1',
    UserId: '1'
  }, {
    AlbumId: '1',
    UserIds: '1,2,3'
  }]
}, {
  url: '/users/1',
  method: 'get'
}, {
  url: '/comments/1',
  method: 'get'
}, {
  url: '/comments',
  method: 'post',
  input: [{
    content: '一条评论',
    PictureId: '4',
    ActionId: '1'
  }, {
    content: '二条评论',
    ActionId: '2',
    OrignalCommentId: '1'
  }]
}, {
  url: '/comments/1',
  method: 'delete'
}, {
  url: '/likes/1',
  method: 'get'
}, {
  url: '/likes',
  method: 'post',
  input: [{
    type: 'LL',
    PictureId: '4'
  }, {
    type: 'DD',
    ActionId: '2'
  }]
}, {
  url: '/likes/1',
  method: 'delete'
}, {
  url: '/messages/1',
  method: 'get'
}];

urls.unshift({
  url: '/getOwnAlbums',
  note: '后面可以加参数，如/getOwnAlbums?userId=2,不加参数默认是查自己的建立相册，具体可以看加参数请求的doc',
  method: 'get'
}, {
  url: '/getOwnAlbums?userId=2',
  method: 'get'
});

urls.unshift({
  url: '/getRelatedAlbums',
  note: '后面可以加参数，如/getRelatedAlbums?userId=2,不加参数默认是查自己的加入相册，具体可以看加参数请求的doc',
  method: 'get'
}, {
  url: '/getRelatedAlbums?userId=2',
  method: 'get'
});

urls.push({
  url: '/getAllUnreadMessages',
  method: 'get'
});

urls.push({
  url: '/getQiniuUptoken',
  method: 'get'
});

module.exports = urls;