define([
    'client',
    'plugin/assetmanager'
], function(client, assetManager) {

    EventCast.Controller = new Class({
        Extends: EventCast.Client,

        _transition: undefined,

        _onPluginsLoaded: function() {
            var self = this;

            this._loadProjects();
            this._loadProjectInfo();

            this._connector.addEvent('setScreen', function(screenName, options) {
                self._onScreenChange(screenName, options);
            });

            this._connector.addEvent('toggleOverlay', function(overlayName, isVisible) {
                self._onToggleOverlay(overlayName, isVisible);
            });

        },

        _loadProjects: function() {
            //TODO: Initialize a list with projects
        },

        _loadProjectInfo: function() {
            var self = this;

            // project name
            $$('#projects .name').set('text', this.options.project);

            var screenList = $('screenList');
            // screens:
            Object.each(assetManager.screens, function(config, screenName) {
                var btn = new Element('button', {
                    text: screenName,
                    'class': 'btn' + (self.options.currentScreen == screenName ? ' btn-success' : ''),
                    'data-screen': screenName,
                    events: {
                        click: function() {
                            this.removeClass('btn-success');
                            this.addClass('btn-warning');
                            self.setScreen(screenName);
                        }
                    }
                });
                var listItem = new Element('li');

                listItem.grab(btn).inject(screenList);
            });

            var overlayList = $('overlayList');
            Object.each(assetManager.overlays, function(config, overlayName) {
                var btn = new Element('button', {
                    text: overlayName,
                    'class': 'btn'+ ((self.options.currentOverlays.indexOf(overlayName) != -1) ? ' active': ''),
                    'data-overlay': overlayName,
                    events: {
                        click: function() {
                            var isActive = this.hasClass('active');
                            this.addClass('btn-warning');
                            self.toggleOverlay(overlayName, !isActive);
                        }
                    }
                });
                var listItem = new Element('li');
                listItem.grab(btn).inject(overlayList);
            });
        },

        setScreen: function(screenName, options) {
            options = options || false;

            this._connector.setScreen(screenName, options);
        },

        toggleOverlay: function(overlayName, isVisible) {
            this._connector.toggleOverlay(overlayName, isVisible);
        },

        _onScreenChange: function(screenName, options) {
            var screenList = $('screenList');
            Array.each(screenList.getElements('button'), function(button) {
                var buttonScreen = button.getProperty('data-screen');
                button.removeClass('btn-warning');
                button.toggleClass('btn-success', (buttonScreen == screenName));
            });
        },

        _onToggleOverlay: function(overlayName, isVisible) {
            var overlayList = $('overlayList');
            overlayList.getElements('button').each(function(button) {
                var buttonOverlay = button.getProperty('data-overlay');
                button.removeClass('btn-warning');

                if (buttonOverlay == overlayName) {
                    button.toggleClass('active', isVisible);
                }
            });
        }
    });

    var config = {
        project: 'demo'
    };

    window.addEvent('domready', function(){
        var controller = new EventCast.Controller(config);
        controller.start();
    });

});