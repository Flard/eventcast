define([
    'plugin/AssetManager',
    'plugin/facebook/FacebookCommentScreen',
    //'plugin/twitter/TwitterMessageProvider',
    'base/BasePlugin',
    'core'
    ],
    function(assetManager, facebookCommentScreen/*, messageProvider*/) {

        EventCast.FacebookPlugin = new Class({
            Extends: EventCast.BasePlugin,

            initialize: function() {
                this.parent('facebook');

                assetManager.registerScreen(facebookCommentScreen);

            },

            _messageProvider: undefined,
            load: function(options) {

                //this._messageProvider = new EventCast.TwitterMessageProvider(options);

//                if (assetManager.hasPlugin('messagebox')) {
//                    assetManager.plugins['messagebox'].addSource(this._messageProvider);
//                }

            }
        });

        assetManager.registerPlugin(new EventCast.FacebookPlugin());
    });
