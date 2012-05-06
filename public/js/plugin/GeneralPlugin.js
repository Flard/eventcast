define([
    'plugin/AssetManager',
    'plugin/general/EmptyScreen',
    'plugin/general/DigitalClockScreen',
    'plugin/general/LogoOverlay',
    'base/BasePlugin',
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
