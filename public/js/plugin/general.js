define([
    'plugin/pluginmanager',
    'screen/empty',
    'screen/digitalclock',
    'base/screenplugin'
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
