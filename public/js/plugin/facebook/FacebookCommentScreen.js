define(['plugin/VariableManager', 'plugin/AssetManager', 'base/BaseScreen', 'plugin/facebook/FacebookMessage'], function(variableManager) {
    EventCast.Screens.FacebookCommentScreen = new Class({
        Extends: EventCast.BaseScreen,
        Implements: [ Options ],
        options: {
            interval: 10000,
            messagesPerLoad: 10
        },

        label: 'Facebook',

        _messages: [],
        _elements: {},
        _activeIndex: -1,
        _interval: undefined,
        _request: undefined,

        initialize: function() {

            this.parent('facebookcommentstream');

        },

        _render: function(canvas) {
            var screen = new Element('div', {
                class: 'screen facebookcommentstream'
            });

            this._elements['image'] = new Element('img', { src: 'https://si0.twimg.com/profile_images/2435827100/vr7g33bqlexkkzba9ka6.jpeg', width: 250, height: 250});
            this._elements['author'] = new Element('div', { text: 'Jan Janssen', class: 'author'});
            this._elements['message'] = new Element('div', { text: 'Dit is mijn berichtje'});
            this._elements['box'] = new Element('div', { class: 'facebook-comment'});
            this._elements['box'].grab(this._elements['image']);
            this._elements['box'].grab(this._elements['message']);
            this._elements['box'].grab(this._elements['author']);

            this._elements['box'].inject(screen);
            this._elements['box'].setStyle('display', 'none');

            var postId = variableManager.get('facebook.comment.id');
            this._setPostId(postId);

            var self = this;
            EventCast.variableManager.listen('facebook.comment.id', function(value) {
                self._setPostId(value);
            });

            screen.inject(canvas);
            return screen;
        },

        _setPostId: function(postId) {
            EventCast.log('Facebook', 'Switching to post ID '+postId);

            if (!!this._request)    this._request.cancel();
            if (!!this._interval)   window.clearInterval(this._interval);

            this._messages = [];
            this._activeIndex = -1;
            this._elements['box'].setStyle('display', 'none');

            var accessToken = variableManager.get('facebook.access_token');

            this._baseUrl = 'https://graph.facebook.com/'+postId+'/comments?access_token='+accessToken;
            this._loadComments(this._baseUrl);

            var self = this;
            this._interval = window.setInterval(function() {
                    self._nextMessage()
                }, 6000
            );
        },

        _loadComments: function(url) {
            var self = this;

            this._request = new Request.JSONP({
                url: url,
                onSuccess: function(data) {

                    console.log(data);
                    if (!data.data) {
                        if (data.error) {
                            EventCast.warn('Facebook', data.error.message, data);
                        } else {
                            EventCast.warn('Facebook', 'Invalid facebook server data', data);
                        }
                    } else {
                        //console.log(data);
                        self._parseResults(data.data);

                        if (data.paging && data.paging.cursors) {
                            url = self._baseUrl+'&after='+data.paging.cursors.after;
                        }
                        //console.log(url);
                        self._queueRequest(url);
                    }
                },
                onError: function() {
                    EventCast.warn('Facebook', 'Could not load facebook messages!');
                    self._queueRequest(url);
                }
            })
            this._request.send();
        },

        _parseResults: function(comments) {

            var self = this;
            comments.each(function(commentData) {
                var message = new EventCast.FacebookMessage(commentData);
                self.addMessage(message);
            })
        },

        _queueRequest: function(url, interval) {
            var self = this;
            this._timer = window.setTimeout(function() {
                self._loadComments(url);
            }, interval || this.options.interval)
        },

        addMessage: function(message) {

            this._messages.push(message);

        },

        _nextMessage: function() {

            if (this._messages.length === 0) return;

            var wasVisible = (this._activeIndex >= 0);

            this._activeIndex = (this._activeIndex + 1) % this._messages.length;

            var message = this._messages[this._activeIndex];
            this._elements['author'].innerText = message.author;
            this._elements['message'].innerText = message.message;
            this._elements['image'].src = message.avatarUrl;

            if (!wasVisible) {
                this._elements['box'].setStyle('display', 'block');

            }
        }
    });

    return new EventCast.Screens.FacebookCommentScreen();
});