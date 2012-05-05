define([
    'plugin/assetmanager',
    'plugin/twitter/twitterwall',
    'base/plugin',
    'core'
    ],
    function(assetManager, twitterWall) {

        EventCast.TwitterPlugin = new Class({
            Extends: EventCast.BasePlugin,

            initialize: function() {
                this.parent('twitter');

                assetManager.registerScreen(twitterWall);
            }
        });

        assetManager.registerPlugin(new EventCast.TwitterPlugin());
    });
