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
                            this.removeClass(' btn-success');
                            this.addClass(' btn-warning');
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
                    'class': 'btn ',
                    events: {
                        click: function() {
                            console.log(this.hasClass('active'));
                            this.toggleClass('active');
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

        _onScreenChange: function(screenName, options) {
            var screenList = $('screenList');
            Array.each(screenList.getElements('button'), function(button) {
                var buttonScreen = button.getProperty('data-screen');
                button.removeClass('btn-warning');
                button.toggleClass('btn-success', (buttonScreen == screenName));
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