import Setting from "./setting.js";

export default class UsersSettings extends Setting {
    constructor(settings) {
        super(settings, []); // <--- there is an array. if not set, it's an object

        this.config = this.settings.config;
        this.source = this.config.users;

        this.on('create', (prop, value) => this.settings.created ? this.settings.setGlobalConfig() : null);
        this.on('update', (prop, value) => this.settings.created ? this.settings.setGlobalConfig() : null);
        this.on('delete', (prop) => this.settings.created ? this.settings.setGlobalConfig() : null);

        //
        if (Array.isArray(this.source.target)) {
            this.source.target.forEach(target => this.data.push(target));
        } else {
            this.source.keys().forEach(key => this.data[key] = this.source[key]);
        }

        return this.data;
    }
}