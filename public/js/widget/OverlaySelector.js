define([
    'core',
    'widget/SlideSwitch'
    ],
    function() {

    EventCast.Widgets.OverlaySelector = new Class({
        Implements: [Options, Events],

        options: {
            overlays: {},
            currentOverlays: []
        },

        _element: undefined,
        _switches: {},

        initialize: function(target, options) {

            this.setOptions(options);

            this._element = $(target);

            this._render();
        },

        _render: function() {

             var self = this;

             Object.each(this.options.overlays, function(label, overlayName) {
//                var btn = new Element('button', {
//                    text: overlayName,
//                    'class': 'btn'+ ((self.options.currentOverlays.indexOf(overlayName) != -1) ? ' active': ''),
//                    'data-overlay': overlayName,
//                    events: {
//                        click: function() {
//                            var isActive = this.hasClass('active');
//                            this.addClass('btn-warning');
//                            self.toggleOverlay(overlayName, !isActive);
//                        }
//                    }
//                });
//                var listItem = new Element('li');
//                listItem.grab(btn).inject(overlayList);

                 var slideSwitch = new EventCast.Widgets.SlideSwitch({
                     injectInto: self._element,
                     label: label,
                     value: (self.options.currentOverlays.indexOf(overlayName) != -1),
                     id: 'overlay-switch-'+overlayName,
                     onChange: function(newValue) {

                         self.fireEvent('toggleOverlay', [ overlayName, newValue ]);

                     }
                 });
                 self._switches[overlayName] = slideSwitch;

            });


        },

        toggleOverlay: function(overlayName, isVisible) {

            this._switches[overlayName].setValue(isVisible);

        }

    })
});