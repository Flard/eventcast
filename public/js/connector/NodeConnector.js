define(
    ['base/BaseConnector','/socket.io/socket.io.js', 'core'],
    function() {
        EventCast.Connector.Node = new Class({
            Extends: EventCast.BaseConnector,

            _socket: undefined,

            loadProjectData: function(projectName, options, callback) {
                var self = this;

                // Open a new connection (socket)
                var socket = this.socket = io.connect(options.serverAddress);

                // Register a listener for the connect event
                socket.on('connect', function() {

                    // Upon connect, call the setProject event
                    socket.emit('setProject', projectName, callback);

                });

                socket.on('setScreen', function(options) {
                    self.fireEvent('setScreen', options);
                });

                socket.on('toggleOverlay', function(options) {
                    self.fireEvent('toggleOverlay', options);
                });

            },

            setScreen: function(screenName, options) {
                this.socket.emit('setScreen', [ screenName, options ]);
            },

            toggleOverlay: function(overlayName, isVisible) {
                this.socket.emit('toggleOverlay', [ overlayName, isVisible]);
            }
        });

        return new EventCast.Connector.Node();
    }
);