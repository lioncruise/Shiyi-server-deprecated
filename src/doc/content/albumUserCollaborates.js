'use strict';

module.exports = [{
  fileName: 'DELETE albumUserCollaborates',
  func: '删除用户和相册的维护者关系',
  note: [
          '1.此接口为post /albumUserCollaborates 的逆操作。',
          '2.可以包含UserId设置一个用户离开相册，或者UserIds多个用户。',
          '3.也可以采用url参数的方式调用，比如/albumUserCollaborates?UserId=1&AlbumId=1，仅限DELETE动作接口。',
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
          '3.形式如 https://api.itimepost.com/joinAlbum?a=4&c=f17713 。',
          '4.自己加入自己的相册不会报错，但是后台实际上没有加入。',
          '5.不能加入private相册。',
          '6.data中是加入的相册的信息。',
          ],
  requests: [
  {
    method: 'get',
    url: '/joinAlbum?a=4&c=f17713',
  },
  ],
},
];
