define([
    'plugin/AssetManager',
    'plugin/twitter/TwitterWallScreen',
    'plugin/twitter/TwitterMessageProvider',
    'base/BasePlugin',
    'core'
    ],
    function(assetManager, twitterWall, messageProvider) {

        EventCast.TwitterPlugin = new Class({
            Extends: EventCast.BasePlugin,

            initialize: function() {
                this.parent('twitter');

                assetManager.registerScreen(twitterWall);

            },

            _messageProvider: undefined,
            load: function(options) {

                this._messageProvider = new EventCast.TwitterMessageProvider(options);

                if (assetManager.hasPlugin('messagebox')) {
                    assetManager.plugins['messagebox'].addSource(this._messageProvider);
                }

            }
        });

        assetManager.registerPlugin(new EventCast.TwitterPlugin());
    });
