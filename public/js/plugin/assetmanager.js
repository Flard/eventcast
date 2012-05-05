define(['core'], function() {
    EventCast.AssetManager = new Class({
        plugins: {},
        screens: {},
        overlays: {},

        initialize: function() {

        },

        loadPlugin: function(pluginName, options, callback) {

            EventCast.log('PluginManager', 'Loading plugin "'+pluginName+'"');
            var self = this;
            require(["plugins/"+pluginName], function() {
                var plugin = self.init(pluginName, options);
                callback(plugin);
            });

        },

        registerPlugin: function(plugin) {

            EventCast.log('PluginManager', 'registered plugin "'+plugin.name+'"');
            this.plugins[plugin.name] = plugin;

        },

        initPlugin: function(pluginName, options) {

            if (typeof this.plugins[pluginName] !== 'undefined') {

                EventCast.log('PluginManager', 'Initializing plugin "'+pluginName+'"');
                var plugin = this.plugins[pluginName];
                plugin.load(options);
                return plugin;

            } else {

                EventCast.warn('PluginManager', 'Could not load plugin "'+pluginName+'"');
                return false;

            }

        },

        registerScreen: function(screen) {
            EventCast.log('ScreenManager', 'registered screen "'+screen.name+'"');
            this.screens[screen.name] = screen;
        },

        registerOverlay: function(overlay) {
            EventCast.log('ScreenManager', 'registered overlay "'+overlay.name+'"');
            this.overlays[overlay.name] = overlay;
        },

        render: function(canvas) {

            Object.each(this.screens, function(screen, screenName) {
                screen.render(canvas);
            });

            Object.each(this.overlays, function(overlay) {
                overlay.render(canvas);
            })

        }
    });

    EventCast.assetManager = new EventCast.AssetManager();
    return EventCast.assetManager;
});