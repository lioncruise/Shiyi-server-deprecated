'use strict';

const router = require('../router').router;
const albumUserCollaboratesRestfulController = require('./albumUserCollaborates');

router.delete('/userUserFollows', albumUserCollaboratesRestfulController.getDeleteFuction('UserUserFollow'));
