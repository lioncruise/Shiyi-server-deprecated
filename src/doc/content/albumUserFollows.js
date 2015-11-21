'use strict';

module.exports = [{
  fileName: 'DELETE albumUserFollows',
  func: '删除用户和相册的关注关系',
  note: [
          '1.此接口为post /albumUserFollows 的逆操作。',
          '2.可以包含UserId设置一个用户不关注相册，或者UserIds多个用户不关注。',
          ],
  requests: [
  {
    method: 'delete',
    url: '/albumUserFollows',
    data: {
      AlbumId: '2',
      UserId: '2',
    },
  }, {
    method: 'delete',
    url: '/albumUserFollows',
    data: {
      AlbumId: '2',
      UserIds: '3,4',
    },
  },
  ],
},
];
