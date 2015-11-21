'use strict';

module.exports = [{
  fileName: 'GET pictures :id',
  func: '获取某张图片信息',
  note: [
          '1.可加 isWithAlbum=true 参数，在返回内容中添加 图片对应的相册 内容。',
          '2.可加 isWithMemory=true 参数，在返回内容中添加 图片对应的记忆 内容。',
          '3.可加 isWithUser=true 参数，在返回内容中添加 图片创建者的用户信息 内容。',
          '4.可加 isWithFans=true 参数，在返回内容中添加 相册的关注者（关注相册的人）的信息 内容。',
          ],
  requests: [
    {
      method: 'get',
      url: '/pictures/1',
    }, {
      method: 'get',
      url: '/pictures/1?isWithAlbum=true',
    }, {
      method: 'get',
      url: '/pictures/1?isWithMemory=true',
    }, {
      method: 'get',
      url: '/pictures/1?isWithUser=true',
    },
  ],
}, {
  fileName: 'POST pictures',
  func: '新建一张图片',
  note: [
          '1.type需要指定为picture，以后可能会有小视频，需要指定为video。',
          ],
  requests: [
  {
    method: 'post',
    url: '/pictures',
    data: {
      storeKey: '123.jpg',
      type: 'picture',
      AlbumId: '1',
      MemoryId: '1',
    },
  },
  ],
},
];
