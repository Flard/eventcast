module.exports = function(app, express, projectManager) {
    app.get('/', function(req, res){
        //res.sendfile(__dirname + '/views/index.html');
        var projects = projectManager.getPublicList();
        res.render('index', { projects: projects });
    });

    app.get('/player/:projectName', function(req, res){

        var projectName = req.params.projectName;
        if (!projectManager.has(projectName)) {
            res.status(404);
        }

        res.render('player', { project: projectName });
    });

    app.get('/admin/:projectName', function(req, res){
        var projectName = req.params.projectName;
        if (!projectManager.has(projectName)) {
            res.status(404);
        }

        res.render('admin', { project: projectName });
    });

    // List channels
    app.get('/projects', function(req, res) {

        var projectInfo = projectManager.getPublicList();
        res.send(projectInfo);

    });

    app.get('/projects/:projectName/:fileName.css', function(req, res) {
        var fs = require('fs');
        var path = app.root+'/projects/'+req.params.projectName+'/'+req.params.fileName+'.css';
        fs.stat(path, function(err, stat) {
            if (err) {
                res.send(err);
            } else {
                res.sendfile(path);
            }

        });
    });
}