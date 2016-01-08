'use strict';

module.exports = [{
  fileName: 'GET albumRanklist',
  func: '按热度返回相册排行榜',
  note: [
          '1.可以用offset和limit参数，limit最大为50，offset默认为0。',
          '2.可以加入参数tag=美女，可以按tag搜索该tag下的排行榜，默认的话是不限制tag。',
          ],
  requests: [
    {
      method: 'get',
      url: '/albumRanklist?tag=A',
    },
    {
      method: 'get',
      url: '/albumRanklist?tag=A&limit=2',
    },
  ],
},
];
