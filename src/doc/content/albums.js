'use strict';

module.exports = [{
  fileName: 'GET getOwnAlbums',
  func: '获取一个人所创建的相册（包括公开、不公开）',
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
  func: '获取一个人所加入的相册（别人创建的，他加入的）',
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
}, {
  fileName: 'GET getOwnAndRelatedAlbums',
  func: '获取首页展示的相册，自己创建和加入的相册（他所创建的和他所加入的），用于“首页”',
  note: [
          '1.可以带着userId=2的参数，指定某一个特定的用户。',
          '2.可以加isWithRecentPicture=true参数，获得最近一张图片的信息，其中里面包含着最后一张图片主人的信息',
          ],
  requests: [
    {
      method: 'get',
      url: '/getOwnAndRelatedAlbums?userId=1',
    }, {
      method: 'get',
      url: '/getOwnAndRelatedAlbums?userId=1&isWithRecentPicture=true',
    },
  ],
}, {
  fileName: 'GET getPublicAlbums',
  func: '获取一个人所创建的公开的相册（他所创建的，公开的相册），用于“个人信息”界面',
  note: [
          '1.可以带着userId=2的参数，指定某一个特定的用户。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getPublicAlbums?userId=1',
    },
  ],
}, {
  fileName: 'GET getQRCode',
  func: '获取加入某个相册的二维码地址',
  note: [
          '1.加入的相册不能是private的。参数是albumId。',
          '2.用户使用app访问这个地址的时候，需要带着cookie信息。',
          '3.目前二维码地址没有时间限制，生成一次之后，永远可以扫码加入，二维码不会失效。',
          '4.形式如 https://api.itimepost.com/joinAlbum?a=4&c=f17713 。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getQRCode?albumId=4',
    },
  ],
},
];
