define(['plugin/messagebox/message'], function() {
    EventCast.TwitterMessage = new Class({
        Extends: EventCast.Message,

        _tweet: undefined,
        initialize: function(tweet) {
            this.parent(tweet.from_user, tweet.text, tweet.profile_image_url);
            this._tweet = tweet;
        }

    });

});