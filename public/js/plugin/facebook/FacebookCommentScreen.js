define(['plugin/AssetManager', 'base/BaseScreen'], function() {
    EventCast.Screens.FacebookCommentScreen = new Class({
        Extends: EventCast.BaseScreen,

        initialize: function() {
            this.parent('facebookcommentstream');
        },

        _render: function(canvas) {
            var screen = new Element('div', { class: 'screen facebookcommentstream'});
            screen.inject(canvas);
            return screen;
        }
    });

    return new EventCast.Screens.FacebookCommentScreen();
});