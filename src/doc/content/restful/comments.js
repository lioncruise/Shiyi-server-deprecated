'use strict';

module.exports = [{
  fileName: 'GET comments :id',
  func: '获取某条评论',
  note: [
          '1.可加 isWithUser=true 参数，在返回内容中添加 评论者信息 内容。',
          '2.可加 isWithOrignalComment=true 参数，在返回内容中添加 原始评论 内容。',
          '3.如果isWithOrignalComment=true&isWithUser=true均添加，原始评论中也会包含原始评论的评论者的信息 内容。',
          ],
  requests: [
    {
      method: 'get',
      url: '/comments/2',
    }, {
      method: 'get',
      url: '/comments/2?isWithUser=true',
    }, {
      method: 'get',
      url: '/comments/2?isWithOrignalComment=true',
    }, {
      method: 'get',
      url: '/comments/2?isWithOrignalComment=true&isWithUser=true',
    },
  ],
}, {
  fileName: 'POST comments',
  func: '新建一条评论',
  note: [
          '1.可以不包含OrignalCommentId项，但是不能为空字符串。',
          ],
  requests: [
  {
    method: 'post',
    url: '/comments',
    data: {
      content: '这并没有什么意思。',
      MemoryId: '1',
      OrignalCommentId: '1',
    },
  },
  ],
}, {
  fileName: 'DELETE comments :id',
  func: '删除某条评论',
  note: [
          '1.只有评论者可以删除这条评论。',
          ],
  requests: [
  {
    method: 'delete',
    url: '/comments/10',
  },
  ],
},
];
