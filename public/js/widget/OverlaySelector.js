define([
    'libs/mootools-core-1.4.5-full-nocompat',
    'libs/mootools-more-1.4.0.1',
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

        initialize: function(target, options) {
            console.log(options);
            this.setOptions(options);

            this._element = $(target);

            this._render();
        },

        _render: function() {

             var self = this;

             Object.each(this.options.overlays, function(config, overlayName) {
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
                     label: overlayName,
                     value: (self.options.currentOverlays.indexOf(overlayName) != -1),
                     id: 'overlay-switch-'+overlayName
                 });

            });


        }

    })
});