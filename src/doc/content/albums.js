'use strict';

module.exports = [{
  fileName: 'GET getOwnAlbums',
  func: '获取一个人所创建的相册',
  note: [
          '1.可以带着userId=2的参数，指定某一个特定的用户。',
          '2.可以加isWithRecentPicture=true参数，获得最近一张图片的信息，其中里面包含着最后一张图片主人的信息',
          ],
  requests: [
    {
      method: 'get',
      url: '/getOwnAlbums?userId=1',
    }, {
      method: 'get',
      url: '/getOwnAlbums?userId=1&isWithRecentPicture=true',
    },
  ],
}, {
  fileName: 'GET getRelatedAlbums',
  func: '获取一个人所加入的相册',
  note: [
          '1.可以带着userId=2的参数，指定某一个特定的用户。',
          '2.可以加isWithRecentPicture=true参数，获得最近一张图片的信息，其中里面包含着最后一张图片主人的信息',
          ],
  requests: [
    {
      method: 'get',
      url: '/getRelatedAlbums?userId=1',
    }, {
      method: 'get',
      url: '/getRelatedAlbums?userId=1&isWithRecentPicture=true',
    },
  ],
}, {
  fileName: 'GET getFollowAlbums',
  func: '获取一个人所关注的相册',
  note: [
          '1.可以带着userId=2的参数，指定某一个特定的用户。',
          '2.可以加isWithRecentPicture=true参数，获得最近一张图片的信息，其中里面包含着最后一张图片主人的信息',
          ],
  requests: [
    {
      method: 'get',
      url: '/getFollowAlbums?userId=3',
    }, {
      method: 'get',
      url: '/getFollowAlbums?userId=3&isWithRecentPicture=true',
    },
  ],
},
];
