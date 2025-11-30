export default class EventEmitter {
    constructor() {
        this.listeners = new Map();
        this.label = `${this.constructor.name.toUpperCase()} >`;
    }

    on(event, callback) {
        if (!this.listeners.has(event))
            this.listeners.set(event, new Set());

        const set = this.listeners.get(event);
        set.add(callback);

        // unsubscribe function
        return () => {
            const set = this.listeners.get(event);
            if (!set) return;

            set.delete(callback);

            // Set leeren? Dann Event komplett löschen.
            if (set.size === 0) {
                this.listeners.delete(event);
            }
        };
    }

    emit(event, ...args) {
        const set = this.listeners.get(event);
        if (!set) return;
        for (const cb of set) cb(...args);
    }
}