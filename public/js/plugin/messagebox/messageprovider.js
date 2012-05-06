define([], function() {
    EventCast.MessageProvider = new Class({
        Implements: [Events],

        addMessage: function(message) {
            this.fireEvent('newMessage', message);
        }
    });
});