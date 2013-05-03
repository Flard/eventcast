if (!EventCast) var EventCast = {};
if (!EventCast.Screens) EventCast.Screens = {};
if (!EventCast.Overlays) EventCast.Overlays = {};

requirejs.config({
    shim: {
        'libs/mootools-more-1.4.0.1': 'libs/mootools-core-1.4.5-full-nocompat'
    }
});

define([
    'libs/mootools-core-1.4.5-full-nocompat',
    'libs/mootools-more-1.4.0.1',
    "util"
    ], function() {

});