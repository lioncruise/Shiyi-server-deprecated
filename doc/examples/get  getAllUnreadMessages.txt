url: '/getAllUnreadMessages'

method: 'get'



output: 
{
	"statusCode": 200,
	"data": [
		{
			"id": 5,
			"type": "C",
			"content": null,
			"createdAt": "2015-10-21T08:57:46.531Z",
			"updatedAt": "2015-10-21T08:57:46.531Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": null,
			"CommentId": 7,
			"Comment": {
				"id": 7,
				"content": "一条评论",
				"isBlocked": false,
				"createdAt": "2015-10-21 08:57:46.523 +00:00",
				"updatedAt": "2015-10-21 08:57:46.523 +00:00",
				"deletedAt": null,
				"PictureId": 4,
				"UserId": 1,
				"ActionId": 1,
				"OrignalCommentId": null,
				"OrignalComment": null
			},
			"Like": null,
			"User": {
				"id": 1,
				"phone": "13000000000",
				"nickname": "我是666",
				"password": "222222222",
				"gender": "F",
				"birthday": "1999-09-09",
				"hometown": "黑龙江 哈尔滨",
				"motto": "就是666.",
				"avatarUrl": null,
				"wechatToken": null,
				"weiboToken": null,
				"qqToken": null,
				"isBlocked": false,
				"type": "user",
				"createdAt": "2015-10-21 08:57:44.041 +00:00",
				"updatedAt": "2015-10-21 08:57:45.940 +00:00",
				"deletedAt": null
			}
		},
		{
			"id": 6,
			"type": "C",
			"content": null,
			"createdAt": "2015-10-21T08:57:46.544Z",
			"updatedAt": "2015-10-21T08:57:46.544Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": null,
			"CommentId": 8,
			"Comment": {
				"id": 8,
				"content": "二条评论",
				"isBlocked": false,
				"createdAt": "2015-10-21 08:57:46.541 +00:00",
				"updatedAt": "2015-10-21 08:57:46.541 +00:00",
				"deletedAt": null,
				"PictureId": null,
				"UserId": 1,
				"ActionId": 2,
				"OrignalCommentId": 1,
				"OrignalComment": null
			},
			"Like": null,
			"User": {
				"id": 1,
				"phone": "13000000000",
				"nickname": "我是666",
				"password": "222222222",
				"gender": "F",
				"birthday": "1999-09-09",
				"hometown": "黑龙江 哈尔滨",
				"motto": "就是666.",
				"avatarUrl": null,
				"wechatToken": null,
				"weiboToken": null,
				"qqToken": null,
				"isBlocked": false,
				"type": "user",
				"createdAt": "2015-10-21 08:57:44.041 +00:00",
				"updatedAt": "2015-10-21 08:57:45.940 +00:00",
				"deletedAt": null
			}
		},
		{
			"id": 7,
			"type": "L",
			"content": null,
			"createdAt": "2015-10-21T08:57:46.584Z",
			"updatedAt": "2015-10-21T08:57:46.584Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": 6,
			"CommentId": null,
			"Comment": null,
			"Like": {
				"id": 6,
				"type": "LL",
				"createdAt": "2015-10-21 08:57:46.581 +00:00",
				"updatedAt": "2015-10-21 08:57:46.581 +00:00",
				"ActionId": null,
				"PictureId": 4,
				"UserId": 1
			},
			"User": {
				"id": 1,
				"phone": "13000000000",
				"nickname": "我是666",
				"password": "222222222",
				"gender": "F",
				"birthday": "1999-09-09",
				"hometown": "黑龙江 哈尔滨",
				"motto": "就是666.",
				"avatarUrl": null,
				"wechatToken": null,
				"weiboToken": null,
				"qqToken": null,
				"isBlocked": false,
				"type": "user",
				"createdAt": "2015-10-21 08:57:44.041 +00:00",
				"updatedAt": "2015-10-21 08:57:45.940 +00:00",
				"deletedAt": null
			}
		},
		{
			"id": 8,
			"type": "L",
			"content": null,
			"createdAt": "2015-10-21T08:57:46.604Z",
			"updatedAt": "2015-10-21T08:57:46.604Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": 7,
			"CommentId": null,
			"Comment": null,
			"Like": {
				"id": 7,
				"type": "DD",
				"createdAt": "2015-10-21 08:57:46.601 +00:00",
				"updatedAt": "2015-10-21 08:57:46.601 +00:00",
				"ActionId": 2,
				"PictureId": null,
				"UserId": 1
			},
			"User": {
				"id": 1,
				"phone": "13000000000",
				"nickname": "我是666",
				"password": "222222222",
				"gender": "F",
				"birthday": "1999-09-09",
				"hometown": "黑龙江 哈尔滨",
				"motto": "就是666.",
				"avatarUrl": null,
				"wechatToken": null,
				"weiboToken": null,
				"qqToken": null,
				"isBlocked": false,
				"type": "user",
				"createdAt": "2015-10-21 08:57:44.041 +00:00",
				"updatedAt": "2015-10-21 08:57:45.940 +00:00",
				"deletedAt": null
			}
		}
	]
}