define([
    'plugin/assetmanager',
    'plugin/messagebox/messagebox',
    'base/plugin',
    'core'
    ],
    function(assetManager, messageboxOverlay) {

        EventCast.MessageBoxPlugin = new Class({
            Extends: EventCast.BasePlugin,

            initialize: function() {
                this.parent('general');

                assetManager.registerOverlay(messageboxOverlay);
            }
        });

        assetManager.registerPlugin(new EventCast.MessageBoxPlugin());
    });
