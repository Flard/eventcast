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
            if (animate) {
                this._animateShow();
            } else {
                this.el.removeClass('hidden');
            }
        },

        _animateShow: function() {
            //TODO: Animate
            // (Find the best side to slide in from)
            this.el.removeClass('hidden');
        },

        hide: function(animate) {
            if (animate) {
                this._animateHide();
            } else {
                this.el.addClass('hidden');
            }
        },

        _animateHide: function() {
            //TODO: Animate
            // (Find the best side to slide out to)
            this.el.addClass('hidden');
        },

        _render: function(canvas) {
            EventCast.debug('BaseOverlay', 'rendering overlay "' + this.name +'"...');
        }
    });
});