if (!EventCast) var EventCast = {};

EventCast.Player = new Class({
    plugins: [],

    /**
     * Initialize a new Player instance
     * @param config
     */
    initialize: function(config) {
        var defaultOptions = {
            server_address: ''
        };

        this.options = Object.merge(defaultOptions, config || {});
    },

    /**
     * Start the player by connecting to server, load data and start listening to events
     */
    connect: function() {

        // Test if options are set
        if (!this.options.project) {
            // TODO: show select dialog
            console.log('no project set');
            return;
        }

        // Initialize the project
        //this._initProject();
        //return;

        var address = this.options.server_address;
        var project = this.options.project;
        console.log('connecting to server @ "'+address+'"');
        var socket = this.socket = io.connect(address);

        socket.on('connect', function() {
            socket.emit('setProject', project, function(data) {
                console.log(data);
            });
        });

    },

    /**
     * Initialize the project
     */
    _initProject: function() {
        var self = this;

        EventCast.log('Player', 'Loading project info from server...');
        var projectRequest = new Request.JSON({
            url: this.options.server_address+'/projects/'+this.options.project,
            onSuccess: function(projectData) {

                self._loadProjectPlugins(projectData);
                self._render();

            }
        }).get();
    },

    /**
     * Load the plugins contained in the project data
     * @param projectData
     */
    _loadProjectPlugins: function(projectData) {
        var self = this;

        EventCast.debug('Player', 'Loading plugins...');

        self.plugins = [];
        Object.each(projectData.plugins, function(options, pluginName) {

            var plugin = EventCast.pluginManager.load(pluginName, options);
            if (plugin !== false) {
                self.plugins.push(plugin);
            }

        });
    },

    /**
     * Render all basic data
     */
    _render: function() {
        EventCast.log('Player', 'Rendering...');
        this.canvas = $('canvas');

        // Empty the canvas
        this.canvas.empty();

        Array.each(this.plugins, function(plugin) {
            if (typeof plugin.render === 'function') {
                plugin.render(this.canvas);
            }
        });
    }
});

var config = {
    project: 'demo'
};

var player = new EventCast.Player(config);
player.connect();