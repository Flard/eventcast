define([
    'plugin/pluginmanager',
    'plugin/screenmanager',
    'plugin/twitter/twitterwall',
    'base/plugin',
    'core'
    ],
    function(pluginManager, screenManager, twitterWall) {

        EventCast.TwitterPlugin = new Class({
            Extends: EventCast.BasePlugin,

            initialize: function() {
                this.parent('twitter');

                screenManager.register(twitterWall);
            }
        });

        pluginManager.register(new EventCast.TwitterPlugin());
    });
