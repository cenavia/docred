'use strict'

// Libraries
var moment = require('moment-timezone');

// Models
var Agent = require('../models/agent');

var controller = {

    getAgentAll: function(req, res){
        try {
            Agent.find({}, (err, agents) => {

                if (err) return res.status(500).send({message: 'Error find Agents.'});

                if (!agents) return res.status(404).send({message: 'Dont have Agents.'});

                return res.status(200).send({
                    agents
                });

            });
        } catch (error) {
            res.status(500).send({message: 'Error get Agents ' + error})
        }
    },
    
    getAgentById: function(req, res){
        var agentId = req.params.id || null;

        if (agentId == null) return res.status(404).send({message: 'Agent ID no Valid.'});

        try {
            Agent.findById(agentId, (err, agent) => {

                if (err) return res.status(500).send({message: 'Error find Agent.'});

                if (!agent) return res.status(404).send({message: 'Agent Dont exist.'});

                return res.status(200).send({
                    agent
                });

            });
        } catch (error) {
            res.status(500).send({message: 'Error get Agent ' + error})
        }
    },

    saveAgent: function(req, res){
        var agent = new Agent();
        var params = req.body;
        agent.name = params.name;
        agent.email = params.email;
        agent.createdAt = moment().format('MM-DD-YYYY');
        agent.updatedAt = moment().format('MM-DD-YYYY');
        try {
            Agent.findOne({email:agent.email}, (err, agentEmail) => {
                if (!err && !agentEmail) {
                    agent.save((err, agentStored) => {
                        
                        if(err || !agentStored) return res.status(500).send({message: 'Error save Agent ' + err});
                        
                        return res.status(200)
                            .send({
                                id: agentStored._id,
                                createdAt: agentStored.createdAt
                            });
                    });
                } else {
                    return res.status(200).send({
                        id: agentEmail._id,
                        createdAt: agentEmail.createdAt
                    });
                }
            });
        } catch (error) {
            res.status(500).send({message: 'Error save Agent ' + error})
        }
    },

    getAgentFree: function(callback){
        try {
            Agent.findOne({free:true}, (err, agents) => {

                if (err || !agents) return callback('Dont Check Free Agents.', null);

                return callback(null, agents);

            });
        } catch (error) {
            callback(error, null);
        }
    },

    updateStateAgent: function(agentId, state, callback){
        try {
            Agent.findByIdAndUpdate(agentId, {free:state}, {new:true}, (err, agent) => {

                if (err || !agent) return callback('Dont update Agent state.', null);

                return callback(null, agent);

            });
        } catch (error) {
            callback(error, null);
        }
    },

};


module.exports = controller;
