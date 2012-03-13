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
        var self = this;
        
        // Test if options are set
        if (!this.options.project) {
            // TODO: show select dialog
            console.log('no project set');
            return;
        }

        // Connect to server
        console.log('connecting to server...');
        var socket = this.socket = io.connect(this.options.server_address);

        socket.on('connect', function() { // On connect
            
            // Switch to project channel
            socket.emit('setProject', self.options.project, function(data) {
                
                // Initial local project data
                if (!self.isLoaded) {
                    self._loadProject(data);
                }
                
                self.showScreen(data.currentScreen);
                
            }); // socket.emit('setProject')
            
        }); // socket.on('connect')

    },
    
    isLoaded: false,

    _loadProject: function(projectData) {
        this._loadProjectStylesheets(projectData);
        this._loadProjectPlugins(projectData);
        this._render();
        this.isLoaded = true;
    },
    
    _loadProjectStylesheets: function(projectData) {
        EventCast.debug('Player', 'loading stylesheets...');
        
        var headEl = $$('head');
        
        Array.each(projectData.stylesheets || [], function(href) {
            
            var linkEl = new Element('link', { 'rel': 'stylesheet', 'href': href, 'type': 'text/stylesheet' });
            headEl.grab(linkEl);
            
        });
        
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
    },
    
    _currentScreen: undefined,
    showScreen: function(screenName) {
        if (this._currentScreen == screenName) return;
        
        EventCast.log('Player', 'switching to screen "'+screenName+'"');
    }
});

var config = {
    project: 'demo'
};


window.addEvent('domready', function(){
    var player = new EventCast.Player(config);
      player.connect();
});
