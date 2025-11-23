import EventEmitter from "./event_emitter.js";
import Video from "./video.js";

export default class Streams extends EventEmitter {
    constructor(page) {
        super();
        this.page = page;
        //this.element = this.page.element.querySelector('[data-component="grid"]');


    }

    render() {

    }
}