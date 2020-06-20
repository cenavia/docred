'use strict'

var express = require('express');
var IssueController = require('../controllers/issue');

var router = express.Router();

router.get('', IssueController.getIssueAll);
router.get('/assign/', IssueController.assignIssue);
router.get('/:id', IssueController.getIssueById);
router.post('', IssueController.saveIssue);
router.put('/:id', IssueController.closeIssueById);

module.exports = router;
