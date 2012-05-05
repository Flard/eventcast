define(['plugin/assetmanager', 'base/screen'], function() {
    EventCast.Screens.TwitterWallScreen = new Class({
        Extends: EventCast.BaseScreen,

        initialize: function() {
            this.parent('twitterwall');
        },

        _render: function(canvas) {
            var screen = new Element('div', { class: 'screen twitterwall'});
            screen.inject(canvas);
            return screen;
        }
    });

    return new EventCast.Screens.TwitterWallScreen();
});