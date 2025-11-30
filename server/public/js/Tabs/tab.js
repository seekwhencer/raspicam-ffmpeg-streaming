export default class Tab {
    constructor(page) {
        this.page = page;
        this.events = this.page.events;
    }

    on(event, callback) {
        return this.events.on(event, callback);
    }

    emit(event, ...args) {
        return this.events.emit(event, ...args);
    }

    destroy() {
        this.items ? Object.keys(this.items).forEach(k => this.items[k].destroy()) : null;
        this.element ? this.element.remove() : null;
        this.propListenerCreate ? this.propListenerCreate() : null;
        this.propListenerUpdate ? this.propListenerUpdate() : null;
    }

    get group() {
        return this._group;
    }

    set group(val) {
        this._group = val;
        this.renderGroup();
    }
}