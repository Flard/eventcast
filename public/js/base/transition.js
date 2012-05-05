EventCast.BaseTransition = new Class({
    Implements: [Options],

    initialize: function(name) {
        this.name = name;
    },

    go: function(newScreenEl, previousScreenEl) {
        if (previousScreenEl) previousScreenEl.setStyle('display', 'none');
        if (newScreenEl) newScreenEl.setStyle('display', 'block');
    }
});