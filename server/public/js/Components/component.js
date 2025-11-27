import EventEmitter from '../event_emitter.js';

export default class Component extends EventEmitter {
    constructor(options = {}) {
        super();
        this.options = options;
        this.element = false;

        // on prop change update element properties
        this.on('create', (prop, value) => this.element ? this.element[prop] = `${value}` : null);
        this.on('update', (prop, value) => this.element ? this.element[prop] = `${value}` : null);
        this.on('delete', (prop) => this.element ? this.element[prop].removeAttribute(prop) : null);
    }


    render(redraw = false) {
        !this.element || redraw === true ? this.element = document.createElement(this.elementTag) : null;
        this.props.keys().forEach(prop => prop !== 'dataset' ? this.element[prop] = this.props[prop] : null);
        this.props.dataset ? Object.keys(this.props.dataset).forEach(dataKey => this.element.dataset[dataKey] = this.props.dataset[dataKey]) : null;
        this.element.props = this.props;
    }
}