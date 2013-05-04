define(['core'], function() {
    EventCast.VariableManager = new Class({

        variables: {},

        init: function(defaults) {
            this.variables = defaults;
        },

        register: function(name, defaultValue, definition) {
            if (typeof this.variables[name] === 'undefined') {
                this.variables[name] = defaultValue;

                this._trigger(name, defaultValue);
            }
        },

        get: function(name, defaultValue) {
            if (typeof this.variables[name] === 'undefined') {
                return defaultValue;
            } else {
                return this.variables[name];
            }
        },

        set: function(name, value) {
            this.variables[name] = value;

            this._trigger(name, value);
        },

        listen: function(name, callback) {

        },

        _trigger: function(name, value) {

        }

    });

    EventCast.variableManager = new EventCast.VariableManager();
    return EventCast.variableManager;
});