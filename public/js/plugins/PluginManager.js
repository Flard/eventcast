EventCast.PluginManager = new Class({
    plugins: {},

    initialize: function() {

    },

    load: function(pluginName, options) {
        
        EventCast.log('PluginManager', 'Loading plugin "'+pluginName+'"');
        var self = this;
        require(["plugins/"+pluginName], function() {
            self.init(pluginName, options);
        });
        
    },

    register: function(plugin) {

        EventCast.log('PluginManager', 'registered plugin "'+plugin.name+'"');
        this.plugins[plugin.name] = plugin;

    },

    init: function(pluginName, options) {

        if (typeof this.plugins[pluginName] !== 'undefined') {

            EventCast.log('PluginManager', 'Initializing plugin "'+pluginName+'"');
            var plugin = this.plugins[pluginName];
            plugin.load(options);
            return plugin;

        } else {

            EventCast.warn('PluginManager', 'Could not load plugin "'+pluginName+'"');
            return false;

        }

    }
});

EventCast.pluginManager = new EventCast.PluginManager();
