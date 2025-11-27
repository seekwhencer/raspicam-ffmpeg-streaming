import EventEmitter from "./event_emitter.js";

import Button from './Components/button.js';
import TextInput from "./Components/textinput.js";

export default class Overview extends EventEmitter {
    constructor(page) {
        super();
        this.page = page;
        //this.element = this.page.element.querySelector('#overview');
    }

    render() {
        this.element = document.createElement("div");
        this.element.className = "tab overview";
        this.page.element.append(this.element);

        // a button
        this.button = new Button({
            innerHTML: this.settings.logLevel,
            className: 'overview-button',
            onclick: () => console.log('>>>> clicked overview button')
        });
        this.settings.on('logLevel', (value, action) => this.button.element.innerHTML = value);
        this.element.append(this.button.element);

        // a text input
        this.input = new TextInput({
            name:'overview-input',
            className: 'overview-input',
            type: 'text',
            placeholder: 'Type something...',
            value: this.settings.logLevel,
            oninput: (e) => this.settings.logLevel = e.target.value
        });
        this.settings.on('logLevel', (value, action) => this.input.element.value = value);
        this.element.append(this.input.element);
    }

    get settings() {
        return this.page.settings.general;
    }

    set settings(value) {
        // do nothing
    }
}