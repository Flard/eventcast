define([
    'plugin/assetmanager',
    'plugin/general/empty',
    'plugin/general/digitalclock',
    'plugin/general/logo',
    'base/plugin',
    'core'
    ],
    function(assetManager, emptyScreen, digitalClockScreen, logoOverlay) {

        EventCast.GeneralScreenPlugin = new Class({
            Extends: EventCast.BasePlugin,

            initialize: function() {
                this.parent('general');

                assetManager.registerScreen(emptyScreen);
                assetManager.registerScreen(digitalClockScreen);

                assetManager.registerOverlay(logoOverlay);
            }
        });

        assetManager.registerPlugin(new EventCast.GeneralScreenPlugin());
    });
