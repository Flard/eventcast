EventCast.GeneralScreenPlugin = new Class({
    Extends: EventCast.BaseScreenPlugin,

    initialize: function() {
        this.parent('general', ['empty', 'digitalclock']);
    }
});

EventCast.pluginManager.register(new EventCast.GeneralScreenPlugin());