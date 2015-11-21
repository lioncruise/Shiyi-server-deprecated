'use strict';

module.exports = [{
  fileName: 'POST likes',
  func: '新建一个点赞',
  note: [
          '1.type可以为任意的字符串，作为点赞的类型。',
          ],
  requests: [
  {
    method: 'post',
    url: '/likes',
    data: {
      type: 'smile',
      MemoryId: '8',
    },
  },
  ],
}, {
  fileName: 'DELETE likes :id',
  func: '删除某个点赞',
  note: [
          '1.只有点赞者可以删除这个点赞。',
          ],
  requests: [
  {
    method: 'delete',
    url: '/likes/1',
  },
  ],
},
];
