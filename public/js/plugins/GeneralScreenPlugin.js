EventCast.GeneralScreenPlugin = new Class({
    Extends: EventCast.BaseScreenPlugin,

    initialize: function() {
        this.parent('general');
    },

    loadScreens: function() {
        this.screens = {
            empty: new EventCast.Screens.EmptyScreen(this),
            digitalclock: new EventCast.Screens.DigitalClockScreen(this)
        };
    }
});

EventCast.pluginManager.register(new EventCast.GeneralScreenPlugin());