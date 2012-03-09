EventCast.PluginManager = new Class({
    plugins: {},

    initialize: function() {

    },

    register: function(plugin) {

        EventCast.log('PluginManager', 'registered plugin "'+plugin.name+'"');
        this.plugins[plugin.name] = plugin;

    },

    load: function(pluginName, options) {

        if (typeof this.plugins[pluginName] !== 'undefined') {

            EventCast.log('PluginManager', 'Loading plugin "'+pluginName+'"');
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
