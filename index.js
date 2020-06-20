'use strict'

require('./app/settings');

var mongoose = require('mongoose');
var app = require('./app');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${db.url}:${db.port}/${db.name}`)
    .then(()=> {
        console.log('Succesfully DB connect');
        // Start Server
        app.listen(server.port, () => {
           console.log(`Server listen to http://${server.url}:${server.port}`);
        });

        })
    .catch(err => console.log('Error DB connect', err));
