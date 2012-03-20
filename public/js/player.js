require([
    'libs/mootools-core-1.4.5-full-nocompat', 
    '/socket.io/socket.io.js',
    'setup'
    ], function() {

    EventCast.Player = new Class({
        _plugins: [],
        _currentScreen: undefined,
        _transition: undefined,
    
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
    
            // set connection listener
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
    
        /**
         * Initialize with player with server project data
         * @param projectData
         */
        _loadProject: function(projectData) {
            this._loadProjectStylesheets(projectData);
            this._loadProjectPlugins(projectData);
            this._transition = new EventCast.SlideTransition(); // TODO: Load transition from config
            this._render();
            this.isLoaded = true;
        },
    
        /**
         * Load stylesheets from server project data
         * @param projectData
         */
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
    
            self._plugins = [];
            Object.each(projectData.plugins, function(options, pluginName) {
    
                var plugin = EventCast.pluginManager.load(pluginName, options);
                if (plugin !== false) {
                    self._plugins.push(plugin);
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
    
            Array.each(this._plugins, function(plugin) {
                if (typeof plugin.render === 'function') {
                    plugin.render(this.canvas);
                }
            });
        },
        
        /**
         * Switch to screen
         * @param screenName
         */
        showScreen: function(screenName, options) {
            // If we're already showing this screen: ignore
            if (this._currentScreen !== undefined && this._currentScreen.name == screenName) return;
            
            // Get the screen object
            var screen = EventCast.screenManager.getByName(screenName);
            if (!screen) { EventCast.warn('Player', 'Unknown screen "'+screenName+'"'); return }
            
            // Keep reference to previous screen
            var previousScreen = this._currentScreen;
            this._currentScreen = screen;
    
            EventCast.log('Player', 'Switching to screen "'+screenName+'"');
            
            // Call preShow (which allows loading of data)
            screen.preShow(function() {
                
                if (previousScreen) previousScreen.postShow();
                
                this._transition.go(screen.el, previousScreen ? previousScreen.el : false);
                
            }, options, this);
        }
    });
    
    var config = {
        project: 'demo'
    };
    
    
    window.addEvent('domready', function(){
        var player = new EventCast.Player(config);
          player.connect();
    });

});