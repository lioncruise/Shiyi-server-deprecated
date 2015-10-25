'use strict';
var utility = require('utility');

var urls = [{
  url: '/getSeccode',
  method: 'post',
  note: '获取手机验证码，验证码是4位数字，前后端均验证手机号合法性，用这个正则`(^(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$`，用户验证码是否输入正确在前端进行判断，后端没有存储验证码。',
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
    AlbumId: 1
  }
}, {
  url: '/albums/1?offset=0&limit=10&isShowUsers=true',
  method: 'get',
  note: 'offset和limit参数用于控制返回数据中Pictures的数量和偏移，offset不设置默认为0，limit不设置为50，limit最大值为50。 如果想返回中不带Pictures，直接设置limit=0即可，此时offset有无随意。 isShowUsers用于控制返回数据中是否包含Users，因为Users有很多，所以不需要的时候不要包含。 isShowUsers默认为“false”，修改为“true”则返回Users。'
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
  url: '/albumUsers',
  method: 'delete',
  input: [{
    AlbumId: '1',
    UserId: '1'
  }, {
    AlbumId: '1',
    UserIds: '2,3'
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
  note: '后面可以加参数，如/getOwnAlbums?userId=2,不加参数默认是查自己的建立相册',
  method: 'get'
}, {
  url: '/getOwnAlbums?userId=2',
  method: 'get'
});

urls.unshift({
  url: '/getRelatedAlbums',
  note: '后面可以加参数，如/getRelatedAlbums?userId=2,不加参数默认是查自己的加入相册',
  method: 'get'
}, {
  url: '/getRelatedAlbums?userId=2',
  method: 'get'
});

urls.unshift({
  url: '/getActions',
  note: '后面可以加参数，如/getActions?userId=2,不加参数默认是查自己的全部动态',
  method: 'get'
}, {
  url: '/getActions?userId=2',
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

urls.push({
  url: '/reports/1',
  method: 'get'
});

urls.push({
  url: '/reports',
  method: 'post',
  input: [{
    ActionId: '2'
  }, {
    PictureId: '3'
  }, {
    AlbumId: '2'
  }, {
    UserId: '2'
  }],
  note: '可以对Action, Picture, Album, User进行举报'
});

urls.push({
  url: '/pictures/1',
  method: 'get'
}, {
  url: '/pictures',
  method: 'post',
  input: {
    pictureUrl: 'http://test.com/10086',
    AlbumId: '1',
    ActionId: '1'
  }
}, {
  url: '/pictures/2',
  method: 'delete'
});

module.exports = urls;