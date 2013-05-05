define(['plugin/VariableManager', 'plugin/AssetManager', 'base/BaseScreen'], function(variableManager) {
    EventCast.Screens.FacebookCommentScreen = new Class({
        Extends: EventCast.BaseScreen,
        Implements: [ Options ],
        options: {
            interval: 10000,
            messagesPerLoad: 10
        },

        initialize: function() {
            this.parent('facebookcommentstream');
        },

        _render: function(canvas) {
            var screen = new Element('div', {
                class: 'screen facebookcommentstream',
                text: variableManager.get('facebook.comment.id')
            });

            var url = 'https://graph.facebook.com/40796308305_10152387138698306/comments';
            this._loadComments(url);

            screen.inject(canvas);
            return screen;
        },

        _loadComments: function(url) {
            var self = this;

            this._request = new Request.JSONP({
                url: url,
                onSuccess: function(data) {
                    console.log(data);
                    self._parseResults(data.data);

                    var url = self._baseUrl+data.refresh_url;
                    self._queueRequest(url);
                },
                onError: function() {
                    EventCast.warn('Could not load facebook messages!');
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
                self._loadComments(url);
            }, interval || this.options.interval)
        }
    });

    return new EventCast.Screens.FacebookCommentScreen();
});