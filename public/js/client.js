define([
    'core',
    'plugin/AssetManager',
    'plugin/VariableManager',
    ], function(core, assetManager, variableManager) {
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
            var className = this.options.connector.capitalize()+'Connector';
            require(['connector/'+className], function(connector) {

                EventCast.debug('Client', 'Loading project data');
                connector.loadProjectData(self.options.project, self.options, function(data) { self._onProjectDataLoaded(data) });
                self._connector = connector;

            });
        },

        _onProjectDataLoaded: function(projectData) {
            if (this._isLoaded) return false;

            this.setOptions(projectData);
            console.log('Project data', this.options);

            this._loadVariables();
            this._loadPlugins();

            this._isLoaded = true;
        },

        _loadVariables: function() {
            variableManager.init(this._connector, this.options.currentVariables);
        },

        _loadPlugins: function() {
            var self = this;

            var requires = [];
            Object.each(self.options.plugins, function(config, name) {
                var className = name.capitalize()+'Plugin';
                requires.push('plugin/'+className);
            })

            require(requires, function() {
                // Plugins are loaded, now initialize them with configuration data
                Object.each(self.options.plugins, function(config, name) {
                    assetManager.initPlugin(name, config, self.options);
                })

                self._onPluginsLoaded();
            });
        },

        _onPluginsLoaded: function() {
            console.error('_onPluginsLoaded not implemented');
        }
    });
});