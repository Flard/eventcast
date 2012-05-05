define(
    ['base/connector','/socket.io/socket.io.js', 'core'],
    function() {
        EventCast.Connector.Node = new Class({
            Extends: EventCast.BaseConnector,

            _socket: undefined,

            loadProjectData: function(projectName, options, callback) {

                // Open a new connection (socket)
                var socket = this.socket = io.connect(options.serverAddress);

                // Register a listener for the connect event
                socket.on('connect', function() {

                    // Upon connect, call the setProject event
                    socket.emit('setProject', projectName, callback);

                })

            },

            setScreen: function(screenName, options) {
                this.socket.emit('setScreen', screenName);
            }
        });

        return new EventCast.Connector.Node();
    }
);