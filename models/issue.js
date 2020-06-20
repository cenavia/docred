'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var issueSchema = Schema({
    title: {type: String, required:true},
    details: {type: String, required:true},
    response: {type: String, required:false},
    agentId: {type: Schema.ObjectId, ref:"Agent"},
    userId: {type: Schema.ObjectId, ref:"User"},
    stateId: {type: Number, required:true, default: 1},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Issue', issueSchema);
