define([], function() {
    EventCast.Message = new Class({
        author: undefined,
        message: undefined,
        avatarUrl: undefined,

        initialize: function(author, message, avatarUrl) {
            this.author = author;
            this.message = message;
            this.avatarUrl = avatarUrl;
        }
    });
});