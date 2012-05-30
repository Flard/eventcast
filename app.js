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
    res.sendfile(__dirname + '/views/index.html');
});

app.get('/player', function(req, res){
    res.sendfile(__dirname + '/views/player.html');
});

app.get('/admin', function(req, res){
    res.sendfile(__dirname + '/views/admin.html');
});

app.get('/projects/:projectName/:fileName.css', function(req, res) {
    
    var path = __dirname+'/projects/'+req.params.projectName+'/'+req.params.fileName+'.css';
    fs.stat(path, function(err, stat) {
       if (err) {
           res.send(err);
       } else {
           res.sendfile(path);
       }

    });
});

var projects = [];
// List channels
app.get('/listProjects', function(req, res) {
    // return channels
    res.send(projects);

});

var fs = require('fs'),
    path = require('path');
fs.readdir(__dirname+'/projects', function(err, files) {
    files.forEach(function(file) {
        var p = __dirname+'/projects/'+file+'/eventcast.json';
        if (path.existsSync(p)) {
            projects.push(file);
        }

    });
});

//app.get('/projects/:projectName', function(req, res) {
//    //TODO: Check projectName
//    //TODO: Only return "relevant" info
//    res.sendfile();
//});

var currentScreens = {};
var currentOverlays = {};
io.sockets.on('connection', function(socket) {      // On new socket connection
    var activeProject;

    socket.on('setProject', function(project, fn) { // listen for the "setProject" event
        activeProject = project;
        var fs = require('fs');
        var path = __dirname + '/projects/'+project+'/eventcast.json';

        fs.readFile(path, 'ascii', function(err, data) {
            if (err) {
                fn(false);
            } else {
                data = JSON.parse(data);

                if (!currentScreens[project]) currentScreens[project] = data.defaultScreen;
                if (!currentOverlays[project]) currentOverlays[project] = data.defaultOverlays;

                data.currentScreen = currentScreens[project];
                data.currentOverlays = currentOverlays[project];
                
                fn(data);
            }
        });

    });

    socket.on('setScreen', function(options) {
        currentScreens[activeProject] = options[0];
        io.sockets.emit('setScreen', options);
    });

    socket.on('toggleOverlay', function(options) {
        var overlayName = options[0];
        var isVisible = options[1];
        var index =currentOverlays[activeProject].indexOf(overlayName);
        var inArray = (index >= 0);
        if (isVisible && !inArray) {
            currentOverlays[activeProject].push(overlayName);
        } else if (!isVisible && inArray) {
            currentOverlays[activeProject].splice(index, 1);
        }
        io.sockets.emit('toggleOverlay', options);

    })

});


// Start listening
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Started server on port '+port);
