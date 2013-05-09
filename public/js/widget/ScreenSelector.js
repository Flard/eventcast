define([
    'core'
    ],
    function() {

    EventCast.Widgets.ScreenSelector = new Class({
        Implements: [Options, Events],

        options: {


            elementType: 'a',
            defaultClass: 'button dark large',

            firstClass: 'start',
            insideClass: 'inside',
            lastClass: 'end',

            activeClass: 'cta',
            loadingClass: '',

            screens: {},
            currentScreen: undefined
        },

        _element: undefined,

        initialize: function(target, options) {

            this.setOptions(options);

            this._element = $(target);

            this._render();
        },

        _render: function() {

            var self = this,
                totalScreens = this.options.screens.length,
                currentIndex = 0;
            Object.each(this.options.screens, function(config, screenName) {

                var caption = screenName;

                var classList = [ this.options.defaultClass ];
                if (this.options.currentScreen == screenName) classList.push(this.options.activeClass);

                if (currentIndex === 0) classList.push(this.options.firstClass);
                else if (currentIndex == (totalScreens - 1)) classList.push(this.options.lastClass);
                else classList.push(this.options.insideClass);
                currentIndex++;

                var btn = new Element('a', {
                    text: caption,
                    'class': classList.join(' '),
                    'data-screen': screenName,
                    events: {
                        click: function(e) {
                            e.preventDefault();

                            this.removeClass(self.options.activeClass);
                            this.addClass(self.options.loadingClass);

                            self.fireEvent('setScreen', screenName);
                        }
                    }
                });

                btn.inject(this._element);

            }, this);

        },

        setScreen: function(screenName) {

            Array.each(this._element.getElements('a'), function(button) {

                var buttonScreen = button.getProperty('data-screen');
                button.removeClass(this.options.loadingClass);
                button.toggleClass(this.options.activeClass, (buttonScreen == screenName));

            }, this);
        }

    })
});