define(['plugin/AssetManager', 'base/BaseOverlay'], function() {
    EventCast.Overlays.MessageBoxOverlay = new Class({
        Extends: EventCast.BaseOverlay,

        _plugin: null,

        // Box variables:
        _readPointer: 0,

        // Ticker variables:
        _messageDivs: [],
        _lastMessageIndex: 0,
        _showIndex: -1,

        initialize: function() {
            this.parent('messagebox');
        },

        setParent: function(plugin) {
            this._plugin = plugin;
        },

        _render: function(canvas) {
            var renderMethod = '_render' + this._plugin.options.mode.capitalize();

            return this[renderMethod](canvas);
        },

        _renderBox: function(canvas) {
            var screen = new Element('div', { class: 'messagebox box'});
            screen.inject(canvas);
            this._startBox();
            return screen;
        },

        _renderTicker: function(canvas) {
            var self = this;

            var screen = new Element('div', { class: 'messagebox ticker'});
            screen.inject(canvas);

            for(var i=0;i<this._plugin.options.boxMessageCache;i++) {
                var msgEl = new Element('div', { class: 'message' });
                msgEl.set('tween', {
                    duration: self._plugin.options.box.speed,
                    transition: 'linear'
                });
                msgEl.inject(screen);
                self._messageDivs.push(msgEl);
            }

            this._startTicker();

            return screen;
        },

        start: function() {
            var startMethod = '_start' + this._plugin.options.mode.capitalize();
            return this[startMethod](canvas);
        },

        _startBox: function() {
            this._showNextMessage();
        },

        _startTicker: function() {
            var self = this;
            this._plugin._messages.each(function(msg) {
                self._addTickerMessage(msg);
            });

            this._plugin.addEvent('newMessage', function(msg) {
                self._addTickerMessage(msg);
            });

            var el = this._messageDivs[0];
            el.setStyle('left', 9000);
            el.tween('left', 0);

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
            }, self._plugin.options.interval);
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

        },

        _addTickerMessage: function(msg) {
            var el = this._messageDivs[this._lastMessageIndex];
            this._lastMessageIndex = (this._lastMessageIndex + 1) % this._messageDivs.length;
            this._setTickerMessage(el, msg);
        },

        _setTickerMessage: function(el, msg) {
            var text = msg.author + ': ' + msg.message;
            el.set('text', text);
        }
    });

    return new EventCast.Overlays.MessageBoxOverlay();
});