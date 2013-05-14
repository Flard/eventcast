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
            this._hideLoadMask();

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
            var screenInfo = {};
            Object.each(assetManager.screens, function(instance, name) {
                screenInfo[name] = instance.label || name;
            });
            this._screenSelector = new EventCast.Widgets.ScreenSelector('screenList', {
                screens: screenInfo,
                currentScreen: self.options.currentScreen,
                onSetScreen: function(screenName) {
                    self.setScreen(screenName);
                }
            });

            // Overlays
            var overlayList = $('overlayList');

            var overlayInfo = {};
            Object.each(assetManager.overlays, function(instance, name) {
                overlayInfo[name] = instance.label || name;
            });
            this._overlaySelector = new EventCast.Widgets.OverlaySelector('overlayList', {
                overlays: overlayInfo,
                currentOverlays: self.options.currentOverlays,
                onToggleOverlay: function(overlayName, value) {

                    self.toggleOverlay(overlayName, value);

                }
            });


            var variableTable = $('variableTable');
            Object.each(variableManager.groups, function(definitions, groupName) {
                var fieldset = new Element('fieldset'),
                    label = new Element('label', { text: groupName});

                fieldset.grab(label);

                Object.each(definitions, function(definition, name) {
                    var paragraph = new Element('p'),
                        fieldLabel = new Element('label', { text: definition.label+': ' }),
                        value = variableManager.get(name),
                        input = new Element('input', {
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

                    fieldLabel.grab(input);
                    paragraph.grab(fieldLabel);

                    paragraph.inject(fieldset);

                    variableManager.listen(name, function(value) {
                        input.value = value;
                    });
                });

                fieldset.inject(variableTable);

            });

        },

        _hideLoadMask: function() {
            $('loadMask').setStyle('display', 'none');
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

            this._overlaySelector.toggleOverlay(overlayName, isVisible);

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