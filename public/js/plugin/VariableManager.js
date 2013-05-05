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
                console.log('new variable from server', name, value);
                self._trigger(name, value);
            });
            console.log(connector);

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
            console.log('VariableManager::set', name, value);
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
            console.log('VariableManager.listen', name);
        },

        _trigger: function(name, value) {
            console.log('VariableManager._trigger', name, value);
            var listeners = this._listeners[name];
            if (listeners) {
                Array.each(listeners, function(listener) {
                    listener.call(value);
                });
            }
        }

    });

    EventCast.variableManager = new EventCast.VariableManager();
    return EventCast.variableManager;
});