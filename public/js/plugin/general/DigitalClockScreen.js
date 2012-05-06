define(['plugin/AssetManager', 'base/BaseScreen'], function() {
    EventCast.Screens.DigitalClockScreen = new Class({
        Extends: EventCast.BaseScreen,

        initialize: function() {
            this.parent('digitalclock');
        },

        _render: function(canvas) {
            var screen = new Element('div', { class: 'screen digitalclockscreen'});
            screen.inject(canvas);
            return screen;
        }
    });

    return new EventCast.Screens.DigitalClockScreen();
});