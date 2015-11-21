'use strict';

module.exports = [{
  fileName: 'GET getActions',
  func: '获取一个人所应该展示接收的动态',
  note: [
          '1.每一条动态都附带这需要显示的附加信息。',
          '2.action的type可能为createMemory, createAlbum, openAlbum, collaborateAlbum, followAlbum, followUser, estory之一，需要用不同的显示方式。',
          '3.可添加 offset 和 limit 控制Actions的返回，offset默认为0，limit最大为50。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getActions?offset=0&limit=10',
    },
  ],
},
];
