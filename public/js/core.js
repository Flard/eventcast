if (!EventCast) var EventCast = {};
if (!EventCast.Screens) EventCast.Screens = {};
if (!EventCast.Overlays) EventCast.Overlays = {};
if (!EventCast.Widgets) EventCast.Widgets = {};

requirejs.config({
    paths: {
        'mootools': 'libs/mootools-core-1.4.5-full-nocompat',
        'mootools-more': 'libs/mootools-more-1.4.0.1'
    },
    shim: {
        'mootools': {
            exports: 'MooTools'
        },
        'mootools-more': {
            deps: ['mootools' ],
            exports: 'MooTools.More'
        }
    }
});

define([
    'mootools',
    'mootools-more',
    "util"
    ], function() {

});