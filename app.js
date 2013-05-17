var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

app.root = __dirname;

// Configuration
require('./config')(app, express);

require('./lib/authentication')(app, express);

// Project Manager
var projectManager = require('./lib/projectManager')(app, express);

// All base (static) routes
require('./lib/controller')(app, express, projectManager);

require('./lib/socket')(app, io, projectManager);

// Start listening
var port = process.env.PORT || 3001;
server.listen(port);
console.log('Started server on port '+port);
