import EventEmitter from "./event_emitter.js";
import Grid from "./grid.js";
import Streams from "./streams.js";

export default class Page extends EventEmitter {
    constructor() {
        super();

        this.element = document.querySelector('[data-component="page"]');
        this.grid = new Grid(this);
    }
}