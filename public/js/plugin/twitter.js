define([
    'plugin/pluginmanager',
    'base/screenplugin',
    'core'
    ],
    function(pluginManager) {

        EventCast.TwitterPlugin = new Class({
            Extends: EventCast.BaseScreenPlugin,

            initialize: function() {
                this.parent('twitter', []);
            }
        });

        pluginManager.register(new EventCast.TwitterPlugin());
    });
