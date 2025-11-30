import Component from "./component.js";
import Button from "./button.js";

export default class MultiTextInput extends Component {
    constructor(settings, prop, options = {}) {
        super(settings, prop, options);

        this.elementTag = 'input';
        this.defaults = {
            type: 'hidden',
            value: JSON.stringify(this.value)
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
                onclick: () => input.value = ''
            });
            row.append(clearButton.element);

            /*const label = document.createElement("label");
            label.setAttribute('for', `input-${this.name}-${value}`);
            label.innerHTML = splitCamelCase(value).toUpperCase();
            row.append(label);
*/
            this.inputs.append(row);
            this.rows.push(row);
        });

        //const check = () => this.rows.forEach(row =>  this.settings[this.prop].includes(row.querySelector('input').value) ? row.querySelector('input').checked = true : null);
        //check();
        this.settings.on(this.prop, (value, action) => {
            this.element.value = value;
            //check();
        });

        this.element.classList.add('switch');
    }

    concatValue() {
        const value = [...this.checkboxes.querySelectorAll('input')].filter(b => b.checked).map(b => b.value);
        this.element.value = JSON.stringify(value);
        this.settings[this.prop] = value;
    }
}

const splitCamelCase = (str) => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}
