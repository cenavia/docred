'use strict'

var express = require('express');
var AgentController = require('../controllers/agent');

var router = express.Router();

router.get('', AgentController.getAgentAll);
router.get('/:id', AgentController.getAgentById);
router.post('', AgentController.saveAgent);

module.exports = router;
