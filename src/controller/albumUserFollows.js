'use strict';

const router = require('../router').router;
const albumUserCollaboratesRestfulController = require('./albumUserCollaborates');

router.delete('/albumUserFollows', albumUserCollaboratesRestfulController.getDeleteFuction('albumUserFollows'));
