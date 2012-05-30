define(['core'], function() {
    EventCast.BasePlugin = new Class({
        Implements: [Options, Events],

        initialize: function(name) {
            this.name = name;
            this.fireEvent('initialize', name);
        },

        load: function(options) {
            this.fireEvent('load', options);
            this.setOptions(options);
        }

    });
});