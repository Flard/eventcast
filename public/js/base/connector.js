define(['core'], function() {
    if (!EventCast.Connector) EventCast.Connector = {};

    EventCast.BaseConnector = new Class({

        loadProjectData: function(projectName, options, callback) { console.error('Function "loadProjectData()" not implemented'); },
        setScreen: function(screenName, options) { console.error('Function "setScreen()" not implemented'); }

    });

});