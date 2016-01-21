'use strict';

module.exports = [{
  fileName: 'GET users :id',
  func: '获取某个用户信息',
  note: [
          '1.用户的基本信息里面，含有followers、fans、followAlbums的数量。',
          '2.用户关注的相册，这个信息是不对外公开的。',
          '3.可以带着userId=2的参数，指定当前的用户，如果不带的话则使用请求者当前用户，会返回一个relationStatus参数。',
          '4.该参数可能返回4种状态。3表示相互关注，2表示只有target用户关注user用户，1表示只有user用户关注target用户，0表示互相不关注。',
          '5.relationStatus参数是字符串类型！',
          ],
  requests: [
    {
      method: 'get',
      url: '/users/1?userId=2',
    },
  ],
},
];
