define(['base/BaseMessage'], function() {
    EventCast.FacebookMessage = new Class({
        Extends: EventCast.BaseMessage,

        _message: undefined,
        initialize: function(message) {
            this.parent(message.from.name, message.message, 'https://graph.facebook.com/'+message.from.id+'/picture?type=large');
            this._message = message;
        }

    });

});