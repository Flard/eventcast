EventCast.BaseScreenPlugin = new Class({
    Extends: EventCast.BasePlugin,

    initialize: function(name) {
        this.parent(name);
    },
    
    load: function(options) {
        console.log(this);
        this.setOptions(options);
        
        // Register Screens
        this.loadScreens();
        Object.each(this.screens, function(screen) {
            EventCast.screenManager.register(screen);
        });
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