'use strict';

module.exports = [{
  fileName: 'GET getFollowers',
  func: '获取一个人关注的人',
  note: [
          '1.可以带着userId=2的参数，指定某一个特定的用户。',
          '2.可添加offset和limit控制返回的用户数，offset默认为0，limit最大为50。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getFollowers?userId=1&offset=1&limit=2',
    },
  ],
}, {
  fileName: 'GET getFans',
  func: '获取一个人的粉丝（关注他的人）',
  note: [
          '1.可以带着userId=2的参数，指定某一个特定的用户。',
          '2.可添加offset和limit控制返回的用户数，offset默认为0，limit最大为50。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getFans?userId=1&offset=1&limit=2',
    },
  ],
},
];
