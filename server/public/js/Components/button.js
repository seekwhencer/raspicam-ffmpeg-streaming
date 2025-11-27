import Component from "./component.js";
import DataProxy from "../data_proxy.js";

export default class Button extends Component {
    constructor(options = {}) {
        super(options);

        this.elementTag = 'button';
        this.defaults = {
            'id': '',
            'className': '',
            'type': 'button',
            'disabled': '',
            'dataset': {},
            'innerHTML': 'Click me'
        };
        this.props = new DataProxy(this.defaults, this);

        // set initial
        Object.keys(this.options).forEach(prop => this.props[prop] = this.options[prop]);
        this.props.keys().forEach(prop => !this.options[prop] || this.options[prop] === '' ? delete this.props[prop] : null);

        this.render();


    }

}