define(['plugin/AssetManager', 'base/BaseOverlay'], function() {
    EventCast.Overlays.LogoOverlay = new Class({
        Extends: EventCast.BaseOverlay,

        label: 'Logo',

        initialize: function() {
            this.parent('logo');
        },

        _render: function(canvas) {
            var screen = new Element('div', { class: 'logo'});
            screen.inject(canvas);
            return screen;
        }
    });

    return new EventCast.Overlays.LogoOverlay();
});