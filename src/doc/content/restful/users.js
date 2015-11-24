'use strict';

module.exports = [{
  fileName: 'GET users :id',
  func: '获取某个用户信息',
  note: [
          '1.可加 isWithAlbums=true 参数，在返回内容中添加 用户所创建的相册信息。所有相册都返回，没有offset，limit参数。',
          '2.可加 isWithActions=true 参数，在返回内容中添加 用户的动态信息。',
          '3.可添加 offset 和 limit 控制Actions、Followers、Fans的返回，offset默认为0，limit最大为50。',
          '4.用户的基本信息里面，含有followers、fans、followAlbums的数量。',
          '5.用户关注的相册，这个信息是不对外公开的。',
          ],
  requests: [
    {
      method: 'get',
      url: '/users/1',
    }, {
      method: 'get',
      url: '/users/1?isWithAlbums=true',
    }, {
      method: 'get',
      url: '/users/1?isWithActions=true&offset=0&limit=10',
    },
  ],
},
];
