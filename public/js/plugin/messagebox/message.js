define([], function() {
    EventCast.Message = new Class({
        author: undefined,
        message: undefined,
        avatarUrl: undefined,

        initialize: function(author, message, avatarUrl) {
            this.author = author;
            this.message = message;
            this.avatarUrl = avatarUrl;
        },

        createElement: function() {

            var html = '<div class="msg-avatar"><img src="' + this.avatarUrl + '" /></div><div class="msg-content"><span class="msg-user">' + this.author + ':</span> ' + this.message + '</div>';
            var el = new Element('div', { html: html });
            return el;
        }
    });
});