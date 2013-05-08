define([
    'client',
    'plugin/AssetManager',
    'plugin/VariableManager',
    'widget/ScreenSelector',
    'widget/OverlaySelector'
], function(client, assetManager, variableManager) {

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

            this._connector.addEvent('setProjectVar', function(name, options) {
                console.warn(arguments);
            });
        },

        _loadProjects: function() {
            //TODO: Initialize a list with projects
        },

        _loadProjectInfo: function() {
            var self = this;

            // project name
            $('projectName').set('text', this.options.description);

            // screens:
            this._screenSelector = new EventCast.Widgets.ScreenSelector('screenList', {
                screens: assetManager.screens,
                currentScreen: self.options.currentScreen,
                onSetScreen: function(screenName) {
                    self.setScreen(screenName);
                }
            });


            var overlayList = $('overlayList');
            this._overlaySelector = new EventCast.Widgets.OverlaySelector('overlayList', {
                // TODO: Set
                overlays: {
                    'messagebox': 'MessageBox',
                    logo: 'Logo'
                },
                currentOverlays: self.options.currentOverlays
            });


            var variableTable = $('variableTable');
            Object.each(variableManager.variables, function(value, name) {
                var row = new Element('tr');
                var headerCell = new Element('th', { text: name });
                var input = new Element('input', {
                    type: 'text',
                    value: value,
                    'data-variable': name,
                    events: {
                        change: function(e) {
                            var newValue = e.target.value;
                            variableManager.set(name, newValue);
                        }
                    }
                });
                var valueCell = new Element('td');

                input.inject(valueCell);
                row.grab(headerCell).grab(valueCell).inject(variableTable);

                variableManager.listen(name, function(value) {
                    input.value = value;
                });
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

            this._screenSelector.setScreen(screenName);

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

    var DEFAULT_PROJECT = 'demo';

    //window.addEvent('domready', function(){

        var config = {
            project: ((window.location.hash.length > 2) ? window.location.hash.substr(1) : DEFAULT_PROJECT)
        };

        var controller = new EventCast.Controller(config);
        controller.start();
    //});
});