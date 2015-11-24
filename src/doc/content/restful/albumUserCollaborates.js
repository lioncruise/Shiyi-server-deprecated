'use strict';

module.exports = [{
  fileName: 'POST albumUserCollaborates',
  func: '新建用户和相册的维护者关系',
  note: [
          '1.这个接口会把用户加入相册，即用户成为了一个相册的维护者。',
          '2.可以包含UserId设置一个用户加入相册，或者UserIds加入多个用户。',
          ],
  requests: [
  {
    method: 'post',
    url: '/albumUserCollaborates',
    data: {
      AlbumId: '1',
      UserId: '2',
    },
  }, {
    method: 'post',
    url: '/albumUserCollaborates',
    data: {
      AlbumId: '1',
      UserIds: '2,3,4,5',
    },
  },
  ],
},
];
