EventCast.ScreenManager = new Class({
    screens: {},

    initialize: function() {

    },

    register: function(screen) {

        EventCast.log('ScreenManager', 'registered screen "'+screen.name+'"');
        this.plugins[screen.name] = screen;

    }

});

EventCast.screenManager = new EventCast.ScreenManager();
