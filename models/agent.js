'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var agentSchema = Schema({
    name: {type: String, required:true},
    email: {type: String, required:true},
    free: {type: Boolean, default:true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Agent', agentSchema);
