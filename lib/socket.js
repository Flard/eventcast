module.exports = function(app, io, projectManager) {

    var currentScreens = {};
    var currentOverlays = {};
    var currentVariables = {};
    io.sockets.on('connection', function(socket) {      // On new socket connection
        var activeProject;

        socket.on('setProject', function(project, fn) { // listen for the "setProject" event

            if (!!activeProject) socket.leave(activeProject);
            activeProject = project;
            socket.join(project);

            var fs = require('fs');
            var path = app.root + '/projects/'+project+'/eventcast.json';

            fs.readFile(path, 'ascii', function(err, data) {
                if (err) {
                    fn(false);
                } else {
                    data = JSON.parse(data);

                    if (!currentScreens[project]) currentScreens[project] = data.defaultScreen;
                    if (!currentOverlays[project]) currentOverlays[project] = data.defaultOverlays;
                    if (!currentVariables[project]) currentVariables[project] = data.defaultVariables;

                    data.currentScreen = currentScreens[project];
                    data.currentOverlays = currentOverlays[project];
                    data.currentVariables = currentVariables[project];

                    fn(data);
                }
            });

        });

        socket.on('setScreen', function(options) {
            currentScreens[activeProject] = options[0];
            io.sockets.in(activeProject).emit('setScreen', options);
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
            io.sockets.in(activeProject).emit('toggleOverlay', options);

        });

        socket.on('setVariable', function(options) {
            var name = options[0],
                value = options[1];
            currentVariables[activeProject][name] = value;
            io.sockets.in(activeProject).emit('setVariable', options);
        });

    });


}