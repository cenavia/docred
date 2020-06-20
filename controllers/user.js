'use strict'

// Libraries
var moment = require('moment-timezone');

// Models
var User = require('../models/user');

var controller = {

    getUserAll: function(req, res){
        try {
            User.find({}, (err, users) => {

                if (err) return res.status(500).send({message: 'Error find Users.'});

                if (!users) return res.status(404).send({message: 'Dont have Users.'});

                return res.status(200).send({
                    users
                });

            });
        } catch (error) {
            res.status(500).send({message: 'Error get Users ' + error})
        }
    },
    
    getUserById: function(req, res){
        var userId = req.params.id || null;

        if (userId == null) return res.status(404).send({message: 'User ID no Valid.'});

        try {
            User.findById(userId, (err, user) => {

                if (err) return res.status(500).send({message: 'Error find User.'});

                if (!user) return res.status(404).send({message: 'User Dont exist.'});

                return res.status(200).send({
                    user
                });

            });
        } catch (error) {
            res.status(500).send({message: 'Error get user ' + error})
        }
    },

    saveUser: function(req, res){
        var user = new User();
        var params = req.body;
        user.name = params.name;
        user.phone = params.phone;
        user.email = params.email;
        user.createdAt = moment().format('MM-DD-YYYY');
        user.updatedAt = moment().format('MM-DD-YYYY');
        try {
            User.findOne({email:user.email}, (err, userEmail) => {
                if (!err && !userEmail) {
                    user.save((err, userStored) => {
                        
                        if(err || !userStored) return res.status(500).send({message: 'Error save user ' + err});
                        
                        return res.status(200)
                            .send({
                                id: userStored._id,
                                createdAt: userStored.createdAt
                            });
                    });
                } else {
                    return res.status(200).send({
                        id: userEmail._id,
                        createdAt: userEmail.createdAt
                    });
                }
            });
        } catch (error) {
            res.status(500).send({message: 'Error save user ' + error})
        }
    },

};


module.exports = controller;
