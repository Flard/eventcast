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
    }

});

EventCast.screenManager = new EventCast.ScreenManager();
