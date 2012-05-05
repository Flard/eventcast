define(['plugin/screenmanager', 'base/screen'], function(screenManager) {
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

    var instance = new EventCast.Screens.DigitalClockScreen();
    screenManager.register(instance);
    return instance;
});