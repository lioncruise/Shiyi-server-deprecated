'use strict';

module.exports = [{
  fileName: 'DELETE albumUserCollaborates',
  func: '删除用户和相册的维护者关系',
  note: [
          '1.此接口为post /albumUserCollaborates 的逆操作。',
          '2.可以包含UserId设置一个用户离开相册，或者UserIds离开多个用户。',
          ],
  requests: [
  {
    method: 'delete',
    url: '/albumUserCollaborates',
    data: {
      AlbumId: '1',
      UserId: '2',
    },
  }, {
    method: 'delete',
    url: '/albumUserCollaborates',
    data: {
      AlbumId: '1',
      UserIds: '2,3',
    },
  },
  ],
},
];
