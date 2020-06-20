'use strict'

// Settings
require('../app/settings');

// Libraries
var moment = require('moment-timezone');

// Models
var Issue = require('../models/issue');

// Controllers
var AgentController = require('../controllers/agent');
const agent = require('../models/agent');

var controller = {

    getIssueAll: function(req, res){
        try {
            Issue.find({}, (err, issues) => {

                if (err) return res.status(500).send({message: 'Error find Issues.'});

                if (!issues) return res.status(404).send({message: 'Dont have Issues.'});
                
                return res.status(200).send({
                    issues
                });

            });
        } catch (error) {
            res.status(500).send({message: 'Error get Issues ' + error})
        }
    },
    
    getIssueById: function(req, res){
        var issueId = req.params.id || null;

        if (issueId == null) return res.status(404).send({message: 'Issue ID no Valid.'});

        try {
            Issue.findById(issueId, (err, issue) => {

                if (err) return res.status(500).send({message: 'Error find Issue.'});

                if (!issue) return res.status(404).send({message: 'Issue Dont exist.'});

                return res.status(200).send({
                    issue
                });

            });
        } catch (error) {
            res.status(500).send({message: 'Error get Issue ' + error})
        }
    },

    saveIssue: function(req, res){
        var issue = new Issue();
        var params = req.body;

        issue.title = params.title;
        issue.details = params.details;
        issue.userId = params.userId;
        issue.stateId = 1;
        issue.agentId = null;
        issue.createdAt = moment().format('MM-DD-YYYY');
        issue.updatedAt = moment().format('MM-DD-YYYY');
        try {
            AgentController.getAgentFree((err, agent)=>{
                if (!err && agent){
                    issue.agentId = agent._id;
                    issue.stateId = 2;
                }

                issue.save((err, issueStored) => {

                    if(err || !issueStored) return res.status(500).send({message: 'Error save Issue ' + err});
                    
                    if (issue.agentId != null) {
                        AgentController.updateStateAgent(issue.agentId, false, (err, res)=>{
                            if (err) return res.status(500).send({message: 'Error asignment Agent ' + err});
                        })
                    }
                    return res.status(200)
                        .send({
                            id: issueStored._id,
                            state: state_list[issueStored.stateId],
                            createdAt: issueStored.createdAt
                        });
                });
            });
        } catch (error) {
            res.status(500).send({message: 'Error save Issue ' + error})
        }
    },

    assignIssue: function(req, res){
        try{
            Issue.find({agentId: {"$eq":null}}, (err, issues) => {

                if (err) return res.status(500).send({message: 'Error find Issues.'});
    
                if (!issues || issues.length < 1) return res.status(404).send({message: 'Dont have Issues.'});
    
                issues.forEach(element => {
                    AgentController.getAgentFree((err, agent) => {
                        if (!err && agent){
                            Issue.findByIdAndUpdate(element._id, {agentId:agent._id, stateId:2}, {new:true}, (err, issue) => {
                                if (!err && issue) {
                                    AgentController.updateStateAgent(issue.agentId, false, (err, data)=>{
                                        if (err && !data) return res.status(500).send({message: 'Error asignment Agent ' + err});
                                        else return res.status(200)
                                        .send({issueId: issue._id, agentId: issue.agentId});
                                    })
                                } else {
                                    return res.status(201)
                                        .send({message: 'Dont to assign issue: ' + err});
                                }
                            });
                        } else {
                            return res.status(201)
                                .send({message: 'Dont have free agents assign issue: ' + err});
                        }
                    })
                })
            });
        } catch (error) {
            res.status(500).send({message: 'Error to assign Issues ' + error})
        }
    },

    closeIssueById: function(req, res){
        var params = req.body;
        var issueId = req.params.id || null;
        var response = params.response || null;

        if (issueId == null || response == null) return res.status(404).send({message: 'Issue ID no Valid.'});

        Issue.findByIdAndUpdate(issueId, {response:response, stateId:3}, {new:true}, (err, issue) => {
            if (!err && issue) {
                AgentController.updateStateAgent(issue.agentId, true, (err, data)=>{
                    if (err && !data) return res.status(500).send({message: 'Error asignment Agent ' + err});
                    else return res.status(200)
                        .send({issueId: issue._id, status: state_list[issue.stateId], agentId: issue.agentId});
                })
            } else {
                return res.status(201)
                    .send({message: 'Dont close the issue: ' + err});
            }
        });
    }

};


module.exports = controller;
