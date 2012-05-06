define(['core'], function() {
    EventCast.BaseMessageProvider = new Class({
        Implements: [Events],

        addMessage: function(message) {
            this.fireEvent('newMessage', message);
        }
    });
});