import Component from "./component.js";
import Button from "./button.js";

export default class MultiTextInput extends Component {
    constructor(settings, prop, options = {}, tab) {
        super(settings, prop, options, tab);

        this.elementTag = 'input';
        this.defaults = {
            type: 'hidden',
            value: this.value
        };

        this.init();
        this.render();
    }

    render() {
        super.render();
        this.renderTextInputs();
    }

    renderTextInputs() {
        this.inputs = document.createElement('div');
        this.inputs.className = 'multi-row';

        this.rows = [];
        this.value.forEach(value => {
            if (value === '')
                return;

            const row = this.renderRow(value);
            this.inputs.append(row);
            this.rows.push(row);
        });

        const row = this.renderRow('');
        this.inputs.append(row);
        this.rows.push(row);
    }

    renderRow(value) {
        const row = document.createElement('div');
        row.className = 'row';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = value;
        input.name = `input-${this.name}-${value}`;
        input.oninput = e => this.concatValue();
        row.append(input);

        // the clear button
        const clearButton = new Button(this.settings, this.prop, {
            innerHTML: '🞬',
            className: 'button clear',
            onclick: (e) => this.clearValue(input)
        }, this.tab);
        row.append(clearButton.element);

        return row;
    };

    clearValue(input) {
        input.value = '';
        this.concatValue();
    }

    concatValue() {
        const value = [...this.inputs.querySelectorAll('input[type=text]')].filter(i => i.value !== "").map(i => i.value);
        this.element.value = JSON.stringify(value);
        this.settings[this.prop] = value;

        this.rows = this.inputs.querySelectorAll('.row');
        [...this.rows].forEach(row => {
            const input = row.querySelector('input[type=text]');
            if (input.value === '')
                row.remove();
        });
        const add = this.renderRow('');
        this.inputs.append(add);
    }

    setValue(value) {
        super.setValue(value);
        this.check();
    }

    check() {

    }
}

const splitCamelCase = (str) => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}
