'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

router.get('', UserController.getUserAll);
router.get('/:id', UserController.getUserById);
router.post('', UserController.saveUser);

module.exports = router;
