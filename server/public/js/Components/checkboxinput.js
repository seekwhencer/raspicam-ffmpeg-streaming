import Component from "./component.js";

export default class CheckboxInput extends Component {
    constructor(settings, prop, options = {}) {
        super(settings, prop, options);

        this.elementTag = 'input';
        this.defaults = {
            'id': '',
            'className': '',
            'type': 'checkbox',
            'disabled': '',
            'value': this.settings[this.prop],
            oninput: (e) => this.setValue(),//this.settings[this.prop] = e.target.value,
        };

        this.init();
        this.render();
    }

    render() {
        super.render();
        this.check();

        const oninput = this.element.oninput;
        this.element.oninput = (e) => {
            this.element.value === 'false' ? this.element.value = 'true' : this.element.value = 'false';
            oninput(e);
        }
    }

    setValue() {
        this.settings[this.prop] = this.element.value;
        this.check();
    }

    check() {
        console.log('CHECK', this.element.value);
        this.element.value === 'true' ? this.element.checked = true : this.element.checked = false
    }
}