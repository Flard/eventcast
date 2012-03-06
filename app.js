var express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app);

//public resources
app.configure(function(){
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

// Main pages:
app.get('/', function(req, res){
    res.sendfile(__dirname + '/views/player.html');
});

app.get('/admin', function(req, res){
    res.sendfile(__dirname + '/views/admin.html');
});

// List channels
app.get('/listProjects', function(req, res) {
    // return channels

    var fs = require('fs'),
        path = require('path');
    fs.readdir(__dirname+'/projects', function(err, files) {
        var projects = [];
        files.forEach(function(file) {
            var p = __dirname+'/projects/'+file+'/eventcast.json';
            if (path.existsSync(p)) {
                projects.push(file);
            }

        });
        res.returnJson(projects);
    });
});

// Extension to return JSON data
var http = require('http');
http.ServerResponse.prototype.returnJson = function(data) {
    this.setHeader("Content-Type", "application/json");
    var dataString = JSON.stringify(data);
    this.end(dataString);
};

// Start listening
app.listen(3000);
