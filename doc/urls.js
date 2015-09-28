'use strict';

module.exports = [{
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
    phone: '13000000004',
    password: '123123'
  }
}, {
  url: '/register',
  method: 'post',
  input: {
    phone: '13700000000',
    password: '123456789',
    gender: 'M',
    motto: "Let's go!"
  }
}, {
  url: '/login',
  method: 'post',
  input: {
    phone: '13000000000',
    password: '123456'
  }
}, {
  url: '/logout',
  method: 'get'
}, {
  url: '/update',
  method: 'put',
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