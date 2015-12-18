'use strict';

module.exports = [{
  fileName: 'GET feedbacks',
  func: '获取某用户提交的所有反馈',
  note: [
    '1.只能用于已登录用户查看自己的反馈',
  ],
  requests: [
    {
      method: 'get',
      url: '/feedbacks',
    },
  ],
}, {
  fileName: 'GET feedbacks :id',
  func: '获取某个反馈信息',
  note: [
  ],
  requests: [
    {
      method: 'get',
      url: '/feedbacks/1',
    },
  ],
}, {
  fileName: 'POST feedbacks',
  func: '提交一个反馈',
  note: [
    '1.content为必填字段，且不能为空',
  ],
  requests: [
    {
      method: 'post',
      url: '/feedbacks',
      data: {
        content: '这是一条反馈',
      },
    },
  ],
},
];
