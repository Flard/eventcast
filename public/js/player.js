define([
    'client',
    'plugin/AssetManager'
    ], function(client, assetManager) {

    EventCast.Player = new Class({
        Extends: EventCast.Client,

        _transition: undefined,

        _onPluginsLoaded: function() {

            var self = this;
            this._connector.addEvent('setScreen', function(screenName, options) {
                self.showScreen(screenName, options);
            });
            this._connector.addEvent('toggleOverlay', function(overlayName, isVisible) {
                self.toggleOverlay(overlayName, isVisible);
            });

            this._loadStylesheets();
            this._loadTransition();

        },


        /**
         * Load stylesheets from server project data
         * @param projectData
         */
        _loadStylesheets: function() {
            EventCast.debug('Player', 'loading stylesheets...');

            var headEl = $$('head');

            Array.each(this.options.stylesheets || [], function(href) {

                var linkEl = new Element('link', { 'rel': 'stylesheet', 'href': href, 'type': 'text/stylesheet' });
                headEl.grab(linkEl);

            });

        },

        _loadTransition: function() {
            var self = this;
            require(['transition/'+this.options.transition], function(transition) {
                self._transition = transition;
                self._onLoadComplete();
            });

        },

        _onLoadComplete: function() {
            this._render();

            this.showScreen(this.options.currentScreen);
        },

        _render: function() {
            EventCast.log('Player', 'Rendering...');
            this.canvas = $('canvas');

            // Empty the canvas
            this.canvas.empty();
            assetManager.render(canvas, this.options);
        },

        /**
         * Switch to screen
         * @param screenName
         */
        showScreen: function(screenName, options) {
            // If we're already showing this screen: ignore
            if (this._currentScreen !== undefined && this._currentScreen.name == screenName) return;

            // Get the screen object
            var screen = assetManager.screens[screenName];
            if (!screen) { EventCast.warn('Player', 'Unknown screen "'+screenName+'"'); return }

            // Keep reference to previous screen
            var previousScreen = this._currentScreen;
            this._currentScreen = screen;

            EventCast.log('Player', 'Switching to screen "'+screenName+'"');

            // Call preShow (which allows loading of data), and add a callback which the loader can call when done...
            screen.preShow(function() {

                if (previousScreen) previousScreen.postShow();

                this._transition.go(screen.el, previousScreen ? previousScreen.el : false);

            }, options, this);
        },

        toggleOverlay: function(overlayName, isVisible) {

            var overlay = assetManager.overlays[overlayName];

            var animate = true;
            if (isVisible) {
                overlay.show(animate);
            } else {
                overlay.hide(animate);
            }

        }
    });

    var DEFAULT_PROJECT = 'demo';

    window.addEvent('domready', function(){

        var config = {
            project: ((window.location.hash.length > 2) ? window.location.hash.substr(1) : DEFAULT_PROJECT)
        };

        var player = new EventCast.Player(config);
          player.start();
    });

});