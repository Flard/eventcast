define(['base/plugin', 'core'], function() {
    EventCast.BaseScreenPlugin = new Class({
        Extends: EventCast.BasePlugin,
        screens: undefined,

        initialize: function(name, screens) {
            this.parent(name);
            this.screens = screens;
        },


        render: function(canvas) {
            if (this.screens === undefined) {
                this.loadScreens();
            }

            Object.each(this.screens, function(screen) {
                screen.render(canvas);
            })
        }


    });
});