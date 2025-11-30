import Component from "./component.js";
import Button from './button.js';
import TextInput from "./textinput.js";
import CheckboxInput from './checkboxinput.js';
import SelectInput from './selectinput.js';
import MultiCheckboxInput from './multicheckboxinput.js';
import MultiTextInput from './multitextinput.js';

export default class FormItem extends Component {
    constructor(settings, prop, options = {}) {
        super(settings, prop, options);

        this.elementTag = 'div';
        this.defaults = {
            'id': '',
            'className': 'item'
        };

        this.deleteEventPropChange = this.settings.on(this.prop, (value, action) => {
            this.item.element.value = value;
            this.item.check();
        });

        //console.log('EVENT', this.eventPropChange);

        this.init();
        this.render();
    }

    render() {
        super.render();

        const label = document.createElement("label");
        label.setAttribute('for', `input-${this.name}`);
        label.innerHTML = splitCamelCase(this.prop).toUpperCase();
        this.element.append(label);

        // input field
        if (this.dataType === 'string' || this.dataType === 'number') {
            if (this.values) {
                // select input
                this.item = new SelectInput(this.settings, this.prop, {
                    name: `input-${this.name}`
                });
                /*this.settings.on(this.prop, (value, action) => {
                    this.item.element.value = value;
                });*/
                this.element.append(this.item.element);

                // the clear button
                const clearButton = new Button(this.settings, this.prop, {
                    innerHTML: '🞬',
                    className: 'button clear',
                    onclick: () => this.settings[this.prop] = ''
                });
                this.element.append(clearButton.element);
            } else {
                // text input
                this.item = new TextInput(this.settings, this.prop, {
                    name: `input-${this.name}`
                });
                //this.settings.on(this.prop, (value, action) => input.element.value = value);
                this.element.append(this.item.element);
            }
        }

        // single check switch
        if (this.dataType === 'boolean') {
            this.item = new CheckboxInput(this.settings, this.prop, {
                name: `input-${this.name}`
            });
            //const check = () => this.item.element.value === 'true' ? this.item.element.checked = true : this.item.element.checked = false;
            //check();
            /*this.settings.on(this.prop, (value, action) => {
                this.item.element.value = value;
                check();
            });*/
            this.element.append(this.item.element);
            this.element.classList.add('switch');
        }

        // multi check switches
        if (this.dataType === 'array' && this.values) {
            this.item = new MultiCheckboxInput(this.settings, this.prop, {
                name: `input-${this.name}`
            });

            /*this.settings.on(this.prop, (value, action) => {
                this.item.element.value = JSON.stringify(value);
                this.item.check();
            });*/

            this.element.append(this.item.element);
            this.element.append(this.item.checkboxes);
            this.element.classList.add('switches');
        }

        if (this.dataType === 'array' && !this.values) {
            this.item = new MultiTextInput(this.settings, this.prop, {
                name: `input-${this.name}`
            });

            /*this.settings.on(this.prop, (value, action) => {
                this.item.element.value = JSON.stringify(value);
                hidden.check();
            });*/

            this.element.append(this.item.element);
            this.element.append(this.item.inputs);
            this.element.classList.add('rows');
        }
    }

    destroy() {
        console.log('>>> DESTROYING');
        console.log(this.deleteEventPropChange);
        this.deleteEventPropChange();
    }
}

const splitCamelCase = (str) => {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}