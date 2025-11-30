import Component from "./component.js";

export default class TextInput extends Component {
    constructor(settings, prop, options = {}) {
        super(settings, prop, options);

        this.elementTag = 'input';
        this.defaults = {
            'id': '',
            'className': '',
            'type': 'text',
            'disabled': '',
            'dataset': {},
            'value' : this.settings[this.prop],
            'placeholder': 'type something ...',
            oninput: (e) => this.settings[this.prop] = e.target.value,
        };

        this.init();
        this.render();
    }

    check() {}
}