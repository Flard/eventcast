module.exports = function(app, express) {

    var
        fs = require('fs'),
        path = require('path'),
        projects = {};

    fs.readdir(__dirname+'/../projects', function(err, files) {

        // Loop through all project folders
        files.forEach(function(file) {

            // Check if it contains a project file
            var projectFilePath = __dirname+'/../projects/'+file+'/eventcast.json';
            if (fs.existsSync(projectFilePath)) {

                var projectName = file;

                // Try to read file
                fs.readFile(projectFilePath, 'ascii', function(err, data) {

                    if (data) {

                        // Parse file
                        data = JSON.parse(data);

                        // add to projects
                        var project = new require('./model/project')(projectName, data);
                        projects[projectName] = project.toJSON();
                    }

                });
            }

        });
    });


    return {
        get: function(name) {
            if (typeof projects[name] === 'undefined') {
                return false;
            } else {
                return projects[name];
            }
        },
        has: function(name) {
            return (!!projects[name]);
        },
        each: function(callback, scope) {
            for(var name in projects) {
                var project = projects[name];
                callback.call(scope || app, project);
            }
        },
        getPublicList: function() {

            var result = [];

            this.each(function(project) {
                result.push({
                    name: project.name,
                    description: project.description,
                    is_public: project.is_public
                });
            });

            return result;
        }
    }
}