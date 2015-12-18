'use strict';

module.exports = [{
  fileName: 'POST albumUserFollows',
  func: '新建用户和相册的关注关系',
  note: [
          '1.这个接口会 让用户关注某个相册，即用户成为了一个相册的关注者。',
          '2.如果相册不是public的，不会创建关注关系，会返回statusCode为403。',
          '3.调用/albumUserCollaborates接口，用户加入相册后，会自动创建用户关注相册的关系，无需调用此接口手动创建。',
          '4.可以包含UserId设置一个用户加入相册，或者UserIds加入多个用户。',
          ],
  requests: [
  {
    method: 'post',
    url: '/albumUserFollows',
    data: {
      AlbumId: '2',
      UserId: '2',
    },
  }, {
    method: 'post',
    url: '/albumUserFollows',
    data: {
      AlbumId: '2',
      UserIds: '3,4,5,6,7',
    },
  },
  ],
},
];
