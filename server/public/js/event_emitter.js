export default class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, callback) {
        if (!this.listeners.has(event)) this.listeners.set(event, new Set());
        this.listeners.get(event).add(callback);
        return () => this.listeners.get(event)?.delete(callback);
    }

    emit(event, ...args) {
        if (!this.listeners.has(event)) return;
        for (const cb of this.listeners.get(event)) cb(...args);
    }
}