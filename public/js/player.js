if (!EventCast) var EventCast = {};

EventCast.Player = new Class({
    initialize: function(config) {
        var defaultOptions = {
            server_address: 'http://localhost'
        };

        this.options = Object.merge(defaultOptions, config || {});
    },

    connect: function() {
        if (!this.options.project) {
            // TODO: show select dialog
            console.log('no project set');
            return;
        }
        console.log('loading project info...');

        return;

        console.log('connecting to server...');
        var socket = this.socket = io.connect(this.options.server_address);

        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
        });
    }
});

var config = {
    project: 'demo'
};

var player = new EventCast.Player(config);
player.connect();