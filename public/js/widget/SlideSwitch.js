define([
    'core'
    ],
    function() {

    EventCast.Widgets.SlideSwitch = new Class({
        Implements: [Options, Events],

        options: {

            injectInto: false,

            elementType: 'a',
            defaultClass: 'button dark large',

            value: false,
            label: 'Label',
            id: 'my',
            containerElement: 'p',
            onLabel: 'ON',
            offLabel: 'OFF'
        },

        _element: undefined,
        _input: undefined,

        initialize: function(options) {

            this.setOptions(options);

            this._render();
        },

        _render: function() {

            var self = this;

//            <label for="slideswitchlargedark">Large Slide Switch</label>
//            <input id="slideswitchlargedark" class="slide-switch large dark" type="checkbox" />
//                <label for="slideswitchlargedark">
//                    <span class="wrapper">
//                        <span class="on">ON</span>
//                        <span class="switch"></span>
//                        <span class="off">OFF</span>
//                    </span>
//                </label>

            var container = new Element(this.options.containerElement);

            var label = new Element('label', { for: this.options.id, text: this.options.label });
            var input = new Element('input', {
                id: this.options.id,
                class: 'slide-switch large dark',
                type: 'checkbox',
                checked: this.options.value ? 'checked' : '',
                events: {
                    change: function() {

                        self.fireEvent('change', this.checked);

                    }
                }
            });

            this._input = input;

            var switcherLabel = new Element('label', { for: this.options.id });
            var switcherSpan = new Element('span', { class: 'wrapper '});
            var onLabel = new Element('span', { class: 'on', text: this.options.onLabel });
            var switcher = new Element('span', { class: 'switch' });
            var offLabel = new Element('span', { class: 'off', text: this.options.offLabel });

            switcherSpan.grab(onLabel).grab(switcher).grab(offLabel).inject(switcherLabel);
            container.grab(label).grab(input).grab(switcherLabel);

            container.inject(this.options.injectInto);
        },

        setValue: function(newValue) {
            this._input.checked = newValue;
        }

    })
});