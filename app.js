'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Routes Files
var user_routes = require('./routes/user');
var agent_routes = require('./routes/agent');
var issue_routes = require('./routes/issue');

const routeProtect = express.Router();
routeProtect.use((req, res, next) => {
    next();
});


// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// API Route
app.use('/api/users/', routeProtect, user_routes);
app.use('/api/agents/', routeProtect, agent_routes);
app.use('/api/issues/', routeProtect, issue_routes);

// Module Export
module.exports = app;
