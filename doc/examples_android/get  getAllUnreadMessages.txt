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
			"createdAt": "2015-10-28T11:49:51.503Z",
			"updatedAt": "2015-10-28T11:49:51.503Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": null,
			"CommentId": 7,
			"Comment": {
				"id": 7,
				"content": "二条评论",
				"isBlocked": false,
				"createdAt": "2015-10-28 11:49:51.495 +00:00",
				"updatedAt": "2015-10-28 11:49:51.495 +00:00",
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
				"avatarUrl": "https://dn-itimepost.qbox.me/default.jpg",
				"wechatToken": null,
				"weiboToken": null,
				"qqToken": null,
				"isBlocked": false,
				"type": "user",
				"createdAt": "2015-10-28 11:49:47.767 +00:00",
				"updatedAt": "2015-10-28 11:49:50.829 +00:00",
				"deletedAt": null
			}
		},
		{
			"id": 6,
			"type": "L",
			"content": null,
			"createdAt": "2015-10-28T11:49:51.616Z",
			"updatedAt": "2015-10-28T11:49:51.616Z",
			"UserId": 1,
			"TargetUserId": 1,
			"LikeId": 6,
			"CommentId": null,
			"Comment": null,
			"Like": {
				"id": 6,
				"type": "DD",
				"createdAt": "2015-10-28 11:49:51.606 +00:00",
				"updatedAt": "2015-10-28 11:49:51.606 +00:00",
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
				"avatarUrl": "https://dn-itimepost.qbox.me/default.jpg",
				"wechatToken": null,
				"weiboToken": null,
				"qqToken": null,
				"isBlocked": false,
				"type": "user",
				"createdAt": "2015-10-28 11:49:47.767 +00:00",
				"updatedAt": "2015-10-28 11:49:50.829 +00:00",
				"deletedAt": null
			}
		}
	]
}