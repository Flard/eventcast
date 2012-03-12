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

app.get('/projects/:projectName', function(req, res) {
    //TODO: Check projectName
    //TODO: Only return "relevant" info
    res.sendfile();
});

// Extension to return JSON data
var http = require('http');
http.ServerResponse.prototype.returnJson = function(data) {
    this.setHeader("Content-Type", "application/json");
    var dataString = JSON.stringify(data);
    this.end(dataString);
};

io.sockets.on('connection', function(socket) {
    console.log('connect...');
    socket.on('setProject', function(project, fn) {
        var fs = require('fs');
        var path = __dirname + '/projects/'+project+'/eventcast.json';

        fs.readFile(path, 'ascii', function(err, data) {
            if (err) {
                fn(false);
            } else {
                data = JSON.parse(data);
                fn(data);
            }
        });
    });
});


// Start listening
var port = process.env.PORT || 3000
app.listen(port);
console.log('Started server on port '+port);
