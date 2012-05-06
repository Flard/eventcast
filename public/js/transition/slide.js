define(['base/BaseTransition', 'core'], function() {

    EventCast.SlideTransition = new Class({
        Extends: EventCast.BaseTransition,

        go: function(newScreenEl, previousScreenEl) {
            if (previousScreenEl) {

                var fxOut = new Fx.Tween(previousScreenEl, {
                    duration: 'long',
                    transition: 'bounce:out',
                    link: 'cancel',
                    property: 'left'
                    });
                fxOut.start(0, -640);
            }

            newScreenEl.setStyle('left', '640px');
            newScreenEl.setStyle('display', 'block');
            var fxIn = new Fx.Tween(newScreenEl, {
                    duration: 'long',
                    transition: 'bounce:out',
                    link: 'cancel',
                    property: 'left'
                    });
            fxIn.start(640, 0);
        }
    });

    return new EventCast.SlideTransition();

});