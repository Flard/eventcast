define(['core'], function() {
    EventCast.ScreenManager = new Class({
        screens: {},

        initialize: function() {

        },

        register: function(screen) {

            EventCast.log('ScreenManager', 'registered screen "'+screen.name+'"');
            this.screens[screen.name] = screen;

        },

        getByName: function(screenName) {
            return this.screens[screenName];
        },

        render: function(canvas) {

            Object.each(this.screens, function(screen, screenName) {
                screen.render(canvas);
            });

        }

    });

    EventCast.screenManager = new EventCast.ScreenManager();
    return EventCast.screenManager;
});