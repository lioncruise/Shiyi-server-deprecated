'use strict';

module.exports = [{
  fileName: 'GET users :id',
  func: '获取某个用户信息',
  note: [
          '1.用户的基本信息里面，含有followers、fans、followAlbums的数量。',
          '2.用户关注的相册，这个信息是不对外公开的。',
          ],
  requests: [
    {
      method: 'get',
      url: '/users/1',
    },
  ],
},
];
