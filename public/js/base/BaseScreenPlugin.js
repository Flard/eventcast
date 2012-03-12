EventCast.BaseScreenPlugin = new Class({
    Extends: EventCast.BasePlugin,

    initialize: function(name) {
        this.parent(name);
    },

    render: function(canvas) {
        if (this.screens === undefined) {
            this.loadScreens();
        }

        Object.each(this.screens, function(screen) {
            screen.render(canvas);
        })
    },

    loadScreens: function() {
        EventCast.warn("BaseScreenPlugin", '"loadScreens()" method not implemented for plugin "'+this.name+'"');
        this.screens = {};
    }

});