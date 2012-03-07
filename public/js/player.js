if (!EventCast) var EventCast = {};

EventCast.Player = new Class({
    initialize: function(config) {
        var defaultOptions = {
            server_address: ''
        };

        this.options = Object.merge(defaultOptions, config || {});
    },

    connect: function() {
        if (!this.options.project) {
            // TODO: show select dialog
            console.log('no project set');
            return;
        }
        this._initProject();

        return;

        console.log('connecting to server...');
        var socket = this.socket = io.connect(this.options.server_address);

        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
        });
    },

    _initProject: function() {
        var self = this;

        console.log('loading project info...');
        var projectRequest = new Request.JSON({
            url: this.options.server_address+'/projects/'+this.options.project,
            onSuccess: function(projectData) {

                self._loadProjectPlugins(projectData);

            }
        }).get();
    },

    _loadProjectPlugins: function(projectData) {
        Array.each(projectData.plugins, function(pluginName) {
            console.log('load plugin "'+pluginName+'"');
        });
    }
});

var config = {
    project: 'demo'
};

var player = new EventCast.Player(config);
player.connect();