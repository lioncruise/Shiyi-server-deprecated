'use strict';

module.exports = [{
  fileName: 'GET getValue',
  func: '获取某个键值',
  note: [
          '1.键为key=xxx。',
          ],
  requests: [
    {
      method: 'get',
      url: '/getValue?key=androidVersion',
    },
  ],
},
];
