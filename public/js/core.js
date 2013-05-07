if (!EventCast) var EventCast = {};
if (!EventCast.Screens) EventCast.Screens = {};
if (!EventCast.Overlays) EventCast.Overlays = {};

requirejs.config({
    shim: {
        'libs/mootools-core-1.4.5-full-nocompat': {
            exports: 'Mootools'
        },
        'libs/mootools-more-1.4.0.1': {
            deps: ['libs/mootools-core-1.4.5-full-nocompat' ]
        }
    }
});

define([
    'libs/mootools-core-1.4.5-full-nocompat',
    'libs/mootools-more-1.4.0.1',
    "util"
    ], function() {

});