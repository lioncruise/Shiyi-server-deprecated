'use strict';

module.exports = [{
  fileName: 'GET memories :id',
  func: '获取某条记忆信息',
  note: [
          '1.可加 isWithPictures=true 参数，在返回内容中添加 记忆中的图片 内容。',
          '2.可加 isWithComments=true 参数，在返回内容中添加 记忆评论 内容。（附带每条评论的用户信息）',
          '3.可加 isWithLikes=true 参数，在返回内容中添加 记忆点赞 内容。（附带每条点赞的用户信息）',
          '4.可加 isWithFans=true 参数，在返回内容中添加 相册的关注者（关注相册的人）的信息 内容。',
          '5.可添加offset和limit控制Memories、Pictures的返回，offset默认为0，limit最大为50。',
          '6.isWithMemories和isWithPictures不要同时添加，涉及到大量查表操作。',
          ],
  requests: [
    {
      method: 'get',
      url: '/memories/1',
    }, {
      method: 'get',
      url: '/memories/1?isWithPictures=true',
    }, {
      method: 'get',
      url: '/memories/1?isWithComments=true',
    }, {
      method: 'get',
      url: '/memories/1?isWithLikes=true',
    },
  ],
}, {
  fileName: 'POST memories',
  func: '新建一条记忆',
  note: [
          '1.可以不包含gps, position字段，但是不能上传空字符串。',
          '2.只要相册不是private的，创建记忆就会产生一条action。',
          ],
  requests: [
  {
    method: 'post',
    url: '/memories',
    data: {
      content: '今天的我长这样。',
      gps: '9.13716, -151.5152',
      position: '哈尔滨工业大学 黑店',
      AlbumId: '1',
    },
  },
  ],
}, {
  fileName: 'DELETE memories :id',
  func: '删除某条记忆',
  note: [
          '1.删除记忆会一起删除所有记忆里的信息，包括记忆里所有的action,picutre,like,comment。',
          '2.只有记忆的创建者可以删除这条记忆。',
          ],
  requests: [
  {
    method: 'delete',
    url: '/memories/5',
  },
  ],
},
];
