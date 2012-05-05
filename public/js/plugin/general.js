define([
    'plugin/pluginmanager',
    'plugin/screenmanager',
    'plugin/general/empty',
    'plugin/general/digitalclock',
    'base/plugin',
    'core'
    ],
    function(pluginManager, screenManager, empty, digitalClock) {

        EventCast.GeneralScreenPlugin = new Class({
            Extends: EventCast.BasePlugin,

            initialize: function() {
                this.parent('general');

                screenManager.register(empty);
                screenManager.register(digitalClock);
            }
        });

        pluginManager.register(new EventCast.GeneralScreenPlugin());
    });
