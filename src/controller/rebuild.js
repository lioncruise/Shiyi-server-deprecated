'use strict';

const router = require('../router').router;
const utils = require('../utils');

//重建数据库冗余项
//TODO:改写成异步操作
router.post('/rebuildDatabaseRedundancy', utils.models.rebuildDatabaseRedundancy);
