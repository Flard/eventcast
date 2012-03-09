EventCast.BaseScreenPlugin = new Class({
    Extends: EventCast.BasePlugin,

    screen: undefined,

    initialize: function(name) {
        this.parent(name);
    },

    render: function(canvas) {
        console.log(canvas);
    }

});