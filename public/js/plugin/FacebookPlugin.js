define([
    'plugin/AssetManager',
    "plugin/VariableManager",
    'plugin/facebook/FacebookCommentScreen',
    //'plugin/twitter/TwitterMessageProvider',
    'base/BasePlugin',
    'core'
    ],
    function(assetManager, variableManager, facebookCommentScreen/*, messageProvider*/) {

        EventCast.FacebookPlugin = new Class({
            Extends: EventCast.BasePlugin,

            initialize: function() {
                this.parent('facebook');

                assetManager.registerScreen(facebookCommentScreen);
                variableManager.register('facebook.comment.id', 0, { group: 'Facebook', 'label': 'Stream Comment ID', 'type': 'string' });

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
