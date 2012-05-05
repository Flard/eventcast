define([
    'plugin/pluginmanager',
    'plugin/general/empty',
    'plugin/general/digitalclock',
    'base/screenplugin',
    'core'
    ],
    function(pluginManager, empty, digitalClock) {

        EventCast.GeneralScreenPlugin = new Class({
            Extends: EventCast.BaseScreenPlugin,

            initialize: function() {
                this.parent('general', [empty, digitalClock]);
            }
        });

        pluginManager.register(new EventCast.GeneralScreenPlugin());
    });
