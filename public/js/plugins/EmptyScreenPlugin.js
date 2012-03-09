EventCast.EmptyScreenPlugin = new Class({
    Extends: EventCast.BaseScreenPlugin,

    initialize: function() {
        this.parent('empty');
    }
});

EventCast.pluginManager.register(new EventCast.EmptyScreenPlugin());