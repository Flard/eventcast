define([
    'client',
    'plugin/screenmanager'
], function(client, screenManager) {

    EventCast.Controller = new Class({
        Extends: EventCast.Client,

        _transition: undefined,

        _onPluginsLoaded: function() {
            this._loadProjects();
            this._loadProjectInfo();
        },

        _loadProjects: function() {
            //TODO: Initialize a list with projects
        },

        _loadProjectInfo: function() {
            var self = this;

            // project name
            $$('#projects .name').set('text', this.options.project);

            var list = $('screenList');
            // screens:
            Object.each(screenManager.screens, function(config, screenName) {
                var btn = new Element('button', {
                    text: screenName,
                    events: {
                        click: function() {
                            self.setScreen(screenName);
                        }
                    }
                });
                var listItem = new Element('li');

                listItem.grab(btn).inject(list);
            });
        },

        setScreen: function(screenName, options) {
            options = options || false;

            this._connector.setScreen(screenName, options);
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