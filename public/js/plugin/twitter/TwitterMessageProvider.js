define(['core', 'plugin/messagebox/BaseMessageProvider', 'plugin/twitter/TwitterMessage', 'libs/mootools-more-1.4.0.1'], function() {
    EventCast.TwitterMessageProvider = new Class({
        Extends: EventCast.BaseMessageProvider,
        Implements: [ Options ],
        options: {
            interval: 10000,
            messagesPerLoad: 10
        },

        initialize: function(config) {
            this.setOptions(config);
            this.start();
        },

        _baseUrl: undefined,
        _request: undefined,
        _timer: undefined,

        start: function() {
            var proto = ('https:' == document.location.protocol ? 'https:' : 'http:');
            this._baseUrl = proto+'//search.twitter.com/search.json';

            var url = this._baseUrl + '?&q='+encodeURIComponent(this.options.query)+'&rpp='+this.options.messagesPerLoad+'&include_entities=true';
            this._loadTweets(url);
        },

        _loadTweets: function(url) {
            var self = this;
            this._request = new Request.JSONP({
                url: url,
                onSuccess: function(data) {
                    self._parseResults(data.results);

                    var url = self._baseUrl+data.refresh_url;
                    self._queueRequest(url);
                },
                onError: function() {
                    EventCast.warn('Could not load tweets!');
                    self._queueRequest(url);
                }
            })
            this._request.send();
        },

        _parseResults: function(tweets) {
            var self = this;
            tweets.each(function(tweetData) {
                var message = new EventCast.TwitterMessage(tweetData);
                self.addMessage(message);
            })
        },

        _queueRequest: function(url, interval) {
            var self = this;
            this._timer = window.setTimeout(function() {
                self._loadTweets(url);
            }, interval || this.options.interval)
        }

    });

});