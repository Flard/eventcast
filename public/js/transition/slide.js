define(['base/BaseTransition', 'core'], function() {

    EventCast.SlideTransition = new Class({
        Extends: EventCast.BaseTransition,

        go: function(newScreenEl, previousScreenEl) {
            if (previousScreenEl) {

                var screenWidth = 1024;

                var fxOut = new Fx.Tween(previousScreenEl, {
                    duration: 'long',
                    transition: 'bounce:out',
                    link: 'cancel',
                    property: 'left'
                    });
                fxOut.start(0, -(screenWidth * 1.5)); // add some width to compensate for the bounce
            }

            newScreenEl.setStyle('left', screenWidth+'px');
            newScreenEl.setStyle('display', 'block');
            var fxIn = new Fx.Tween(newScreenEl, {
                    duration: 'long',
                    transition: 'bounce:out',
                    link: 'cancel',
                    property: 'left'
                    });
            fxIn.start(screenWidth, 0);
        }
    });

    return new EventCast.SlideTransition();

});