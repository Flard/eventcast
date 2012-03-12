EventCast.Screens.EmptyScreen = new Class({
    Extends: EventCast.BaseScreen,

    initialize: function() {
        this.parent('empty');
    },

    _render: function(canvas) {
        var screen = new Element('div', { class: 'screen emptyscreen'});
        screen.inject(canvas);
    }
});