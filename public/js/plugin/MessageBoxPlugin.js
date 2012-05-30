define([
    'plugin/AssetManager',
    'plugin/messagebox/MessageBoxOverlay',
    'base/BasePlugin',
    'core'
    ],
    function(assetManager, messageboxOverlay) {

        EventCast.MessageBoxPlugin = new Class({
            Extends: EventCast.BasePlugin,

            overlay: undefined,
            _sources: [],

            _messages: [],
            _size: 0,

            _writePointer: 0,

            _timer: undefined,

            options: {
                interval: 7000,
                mode: 'box',

                box: {
                    speed: 10000
                },
                boxMessageCache: 5
            },

            initialize: function() {
                this.parent('messagebox');

                assetManager.registerOverlay(messageboxOverlay);
                this.overlay = messageboxOverlay;
                this.overlay.setParent(this);
                this.setSize(10);
            },

            addMessage: function(msg) {
                this._messages[this._writePointer] = msg;
                EventCast.debug('MessageBox', 'New message by "' + msg.author + '" placed at #' + this._writePointer);
                this._writePointer = (this._writePointer + 1) % this._messages.length;
                this._size = Math.min(this._messages.length, this._size+1);
                this.fireEvent('newMessage', msg, this._size);
            },

            setSize: function(size) {
                this._messages = new Array(size);
            },

            addSource: function(source) {
                var self = this;
                this._sources.push(source);
                source.addEvent('newMessage', function(msg) { self.addMessage(msg) });
            }
        });

        assetManager.registerPlugin(new EventCast.MessageBoxPlugin());
    });
