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
        },

        _messages: [],
        _size: 10,
        addMessage: function(msg) {
            this._messages.push(msg);
        },

        _sources: [],
        addSource: function(source) {
            var self = this;
            this._sources.push(source);
            source.addEvent('newMessage', function(msg) { self.addMessage(msg) });
        }
    });

    return new EventCast.Overlays.MessageBoxOverlay();
});