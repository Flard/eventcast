define(['plugin/AssetManager', 'base/BaseOverlay'], function() {
    EventCast.Overlays.MessageBoxOverlay = new Class({
        Extends: EventCast.BaseOverlay,
        _plugin: null,

        options: {
            interval: 7000
        },
        _readPointer: 0,

        initialize: function() {
            this.parent('messagebox');
        },

        setParent: function(plugin) {
            this._plugin = plugin;
        },

        _render: function(canvas) {
            var screen = new Element('div', { class: 'messagebox'});
            screen.inject(canvas);
            this.start();
            return screen;
        },

        start: function() {
            this._showNextMessage();
        },

        _showNextMessage: function() {
            if (this._plugin._size > 0) {
                var msg = this._plugin._messages[this._readPointer];
                EventCast.debug('MessageBox', 'Displaying message #'+this._readPointer);
                //console.log(this._size, this._readPointer, this._messages, msg);
                this._showMessage(msg);
                this._readPointer = (this._readPointer + 1) % this._plugin._size;
            } else {
                EventCast.debug('MessageBox', 'Can\'t display any message yet');
            }
            var self = this;
            this._timer = window.setTimeout(function() {
                self._showNextMessage();
            }, self.options.interval);
        },

        _msgEl: undefined,
        _showMessage: function(msg, animate) {
            if (typeof animated === 'undefined') animate = true;

            if (this._msgElem) {
                if (animate) {
                    this._msgElem.addClass('hidden');
                } else {
                    this._msgElem.addClass('hidden');
                }
            }

            this._msgElem = msg.createElement();

            if (this.el) {
                this.el.grab(this._msgElem);
            }

        }
    });

    return new EventCast.Overlays.MessageBoxOverlay();
});