import EventEmitter from "./event_emitter.js";

export default class Video extends EventEmitter {
    constructor(streams) {
        super();
        this.streams = streams;
        //this.element = this.page.element.querySelector('[data-component="grid"]');


    }

    render() {

    }
}