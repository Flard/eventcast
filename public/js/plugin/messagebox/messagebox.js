define(['plugin/assetmanager', 'base/overlay'], function() {
    EventCast.Overlays.MessageBoxOverlay = new Class({
        Extends: EventCast.BaseOverlay,

        options: {
            interval: 3000
        },

        initialize: function() {
            this.parent('messagebox');
        },

        _render: function(canvas) {
            var screen = new Element('div', { class: 'messagebox'});
            screen.inject(canvas);
            this.start();
            return screen;
        },

        _sources: [],

        _messages: [],
        _size: 0,

        _writePointer: 0,
        _readPointer: 0,

        _timer: undefined,

        addMessage: function(msg) {
            this._messages[this._writePointer] = msg;
            EventCast.debug('MessageBox', 'New message by "' + msg.author + '" placed at #' + this._writePointer);
            this._writePointer = (this._writePointer + 1) % this._messages.length;
            this._size = Math.min(this._messages.length, this._size+1);
        },

        setSize: function(size) {
            this._messages = new Array(size);
        },

        addSource: function(source) {
            var self = this;
            this._sources.push(source);
            source.addEvent('newMessage', function(msg) { self.addMessage(msg) });
        },

        start: function() {
            this._showNextMessage();
        },

        _showNextMessage: function() {
            if (this._size > 0) {
                var msg = this._messages[this._readPointer];
                EventCast.debug('MessageBox', 'Displaying message #'+this._readPointer);
                //console.log(this._size, this._readPointer, this._messages, msg);
                this._showMessage(msg);
                this._readPointer = (this._readPointer + 1) % this._size;
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

            this.el.grab(this._msgElem);

        }
    });

    return new EventCast.Overlays.MessageBoxOverlay();
});