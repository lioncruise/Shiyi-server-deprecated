'use strict';

const models = require('../../db').models;
const utils = require('../../utils');
const config = require('../../config');
const albumUserCollaboratesRestfulController = require('./albumUserCollaborates');

exports.create = albumUserCollaboratesRestfulController.getCreateFuction('UserUserFollow');
