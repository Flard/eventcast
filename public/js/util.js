define([], function() {
    EventCast.log = function() {
        if (arguments.length == 1) {
            console.log(arguments);
        } else {
            console.log('['+arguments[0]+'] '+arguments[1]);
        }
    };

    EventCast.warn = function() {
        if (arguments.length == 1) {
            console.warn(arguments);
        } else {
            console.warn('['+arguments[0]+'] '+arguments[1]);
        }
    };

    EventCast.debug = function() {
        if (arguments.length == 1) {
            console.debug(arguments);
        } else {
            console.debug('['+arguments[0]+'] '+arguments[1]);
        }
    };
});