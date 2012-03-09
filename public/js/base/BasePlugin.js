EventCast.BasePlugin = new Class({
    Implements: [Options],

    initialize: function(name) {
        this.name = name;
    },

    load: function(options) {
        this.setOptions(options);
    }

});