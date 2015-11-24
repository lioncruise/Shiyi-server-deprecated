'use strict';

module.exports = [{
  fileName: 'GET getOwnAlbums',
  func: '获取一个人所创建的相册',
  note: [
          '1.可以带着userId=2的参数，指定某一个特定的用户。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getOwnAlbums?userId=1',
    },
  ],
}, {
  fileName: 'GET getOwnAlbums',
  func: '获取一个人所加入的相册',
  note: [
          '1.可以带着userId=2的参数，指定某一个特定的用户。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getOwnAlbums?userId=1',
    },
  ],
}, {
  fileName: 'GET getFollowAlbums',
  func: '获取一个人所关注的相册',
  note: [
          '1.可以带着userId=2的参数，指定某一个特定的用户。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getFollowAlbums?userId=3',
    },
  ],
},
];
