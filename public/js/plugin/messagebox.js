define([
    'plugin/assetmanager',
    'plugin/messagebox/messagebox',
    'base/plugin',
    'core'
    ],
    function(assetManager, messageboxOverlay) {

        EventCast.MessageBoxPlugin = new Class({
            Extends: EventCast.BasePlugin,

            overlay: undefined,

            initialize: function() {
                this.parent('messagebox');

                assetManager.registerOverlay(messageboxOverlay);
                this.overlay = messageboxOverlay;
                messageboxOverlay.setSize(10);
            },

            addSource: function(source) {
                return this.overlay.addSource(source);
            }
        });

        assetManager.registerPlugin(new EventCast.MessageBoxPlugin());
    });
