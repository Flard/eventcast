EventCast.BaseScreen = new Class({
    initialize: function(name) {
        this.name = name;
    },

    render: function(canvas) {
        if (!this.isRendered) {
            this._render(canvas);
        }
        this.isRendered = true;
    },

    _render: function(canvas) {
        EventCast.debug('BaseScreen', 'rendering screen "' + this.name +'"...');
    },

    preShow: function(callback, options, scope) {
        var result = this._preShow(arguments);
        if (result !== false) {
            callback.call(scope || window);
        }
    },

    _preShow: function(callback, options) {

    },


    postShow: function() {
        this._postShow();
    },

    _postShow: function() {

    }
});