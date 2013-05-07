define(['core'], function() {
    EventCast.VariableManager = new Class({

        variables: {},
        _connector: false,
        _listeners: {},

        init: function(connector, defaults) {

            this._connector = connector;

            this.variables = defaults;

            var self = this;
            connector.addEvent('setVariable', function(name, value) {
                self._trigger(name, value);
            });

//            Object.each(this.variables, function(value, name) {
//                self._trigger(name, value);
//            });
        },

        register: function(name, defaultValue, definition) {
            if (typeof this.variables[name] === 'undefined') {
                this.variables[name] = defaultValue;
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
            EventCast.log('VariableManager', 'set('+name+', '+value+')');
            this.variables[name] = value;

            this._connector.setVariable(name, value)
        },

        listen: function(name, callback) {

            var self = this;
            if (typeof self._listeners[name] === 'undefined') {
                self._listeners[name] = [ callback ];
            } else {
                self._listeners[name].push(callback);
            }

        },

        _trigger: function(name, value) {
            var listeners = this._listeners[name];
            if (listeners) {
                Array.each(listeners, function(listener) {
                    listener.call(this, value);
                });
            }
        }

    });

    EventCast.variableManager = new EventCast.VariableManager();
    return EventCast.variableManager;
});