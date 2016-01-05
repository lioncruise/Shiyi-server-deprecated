'use strict';

module.exports = [{
  fileName: 'GET searchUsers',
  func: '根据关键字搜索用户',
  note: [
          '1.参数keyword，作为搜索关键字。',
          '2.keyword为7位数字时，认为是按phone搜索；其他情况，按用户昵称搜索。这个对前端透明，前端不需要处理，后端会自动判断是手机号还是昵称。',
          '3.可以添加参数albumId=2，返回的用户中会多一个isInThisAlbum字段，为true或false，代表这个用户是否在相册中。',
          ],
  requests: [
    {
      method: 'get',
      url: '/searchUsers?keyword=130000000',
    },
    {
      method: 'get',
      url: '/searchUsers?keyword=130000000&albumId=2',
    },
    {
      method: 'get',
      url: '/searchUsers?keyword=B',
    },
  ],
},
];
