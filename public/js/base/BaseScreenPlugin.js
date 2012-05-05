EventCast.BaseScreenPlugin = new Class({
    Extends: EventCast.BasePlugin,
    screens: undefined,

    initialize: function(name, screens) {
        this.parent(name);
        this.screens = screens;
    },
    
    load: function(options) {
        this.setOptions(options);
        
        // Register Screens
        this.loadScreens();

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
        var self = this;

        if (typeof this.screens === 'undefined') {
            EventCast.warn("BaseScreenPlugin", '"loadScreens()" method not implemented for plugin "'+this.name+'"');
            this.screens = {};
        } else if (typeof this.screens === 'object') {

            var requires = [];
            Object.each(this.screens, function(screenName) {
                requires.push("screens/"+screenName);
            });
            
            var initializedScreens = {};
            require(requires, function() {
                Array.each(self.screens, function(screenName){
                    var screen = EventCast.screenManager.getByName(screenName);
                    initializedScreens[screenName] = screen;
                });
            });
            this.screens = {};
            
            
        }
    }

});