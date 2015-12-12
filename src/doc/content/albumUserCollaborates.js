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
}, {
  fileName: 'GET joinAlbum',
  func: '二维码扫码加入相册',
  note: [
          '1.访问的地址是由GET getQRCode生成的。不能手动创建。',
          '2.访问时需要带着cookie。',
          '3. 形式如 https://api.itimepost.com/joinAlbum?a=4&c=f17713 。',
          ],
  requests: [
  {
    method: 'get',
    url: '/joinAlbum?a=4&c=f17713',
  },
  ],
},
];
