define(['core'], function() {
    EventCast.BaseOverlay = new Class({
        el: undefined,

        initialize: function(name) {
            this.name = name;
        },

        render: function(canvas, isVisible) {
            if (this.el === undefined) {
                this.el = this._render(canvas);
                if (!isVisible) {
                    this.hide(false);
                }
            }
        },

        show: function(animate) {
            this.el.removeClass('hidden');
        },

        hide: function(animate) {
            this.el.addClass('hidden');
        },

        _render: function(canvas) {
            EventCast.debug('BaseOverlay', 'rendering overlay "' + this.name +'"...');
        }
    });
});