define(['core'], function() {
    EventCast.BaseMessage = new Class({
        author: undefined,
        message: undefined,
        avatarUrl: undefined,
        _avatarImage: false,

        initialize: function(author, message, avatarUrl) {
            this.author = author;
            this.message = message;
            this.avatarUrl = avatarUrl;

            if (!!avatarUrl) {
                this._avatarImage = new Image();
                this._avatarImage.src = avatarUrl;
            }
        },

        createElement: function() {

            var html = '<div class="msg-avatar"><img src="' + this.avatarUrl + '" /></div><div class="msg-content"><span class="msg-user">' + this.author + ':</span> ' + this.message + '</div>';
            var el = new Element('div', { html: html });
            return el;
        }
    });
});