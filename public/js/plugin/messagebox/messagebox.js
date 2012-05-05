define(['plugin/assetmanager', 'base/overlay'], function() {
    EventCast.Overlays.MessageBoxOverlay = new Class({
        Extends: EventCast.BaseOverlay,

        initialize: function() {
            this.parent('messagebox');
        },

        _render: function(canvas) {
            var screen = new Element('div', { class: 'messagebox'});
            screen.inject(canvas);
            return screen;
        }
    });

    return new EventCast.Overlays.MessageBoxOverlay();
});