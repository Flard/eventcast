define([
    'core',
    'plugin/assetManager'
    ], function(core, assetManager) {
    EventCast.Client = new Class({
        Implements: Options,

        options: {
            project: 'default',
            serverAddress: '',
            connector: 'node'
        },
        _connector: undefined,
        _isLoaded: false,

        /**
         * Initialize the Client object
         * @param options
         */
        initialize: function(options) {

            this.setOptions(options);

        },

        start: function() {
            EventCast.debug('Client', 'Starting Client...');

            this._initConnector();
        },

        _initConnector: function() {
            EventCast.debug('Client', 'Loading connector "' + this.options.connector +'"...');

            var self = this;
            require(['connector/'+this.options.connector], function(connector) {

                EventCast.debug('Client', 'Loading project data');
                connector.loadProjectData(self.options.project, self.options, function(data) { self._onProjectDataLoaded(data) });
                self._connector = connector;

            });
        },

        _onProjectDataLoaded: function(projectData) {
            if (this._isLoaded) return false;

            this.setOptions(projectData);
            console.log('Project data', this.options);

            this._loadPlugins();

            this._isLoaded = true;
        },

        _loadPlugins: function() {
            var self = this;

            var requires = [];
            Object.each(self.options.plugins, function(config, name) {
                requires.push('plugin/'+name);
            })

            require(requires, function() {
                // Plugins are loaded, now initialize them with configuration data

                Object.each(self.options.plugins, function(config, name) {
                    assetManager.initPlugin(name, config);
                })

                self._onPluginsLoaded();
            });
        },

        _onPluginsLoaded: function() {
            console.error('_onPluginsLoaded not implemented');
        }
    });
});