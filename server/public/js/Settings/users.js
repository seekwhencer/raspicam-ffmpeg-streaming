import Setting from "./setting.js";

export default class UsersSettings extends Setting {
    constructor(settings) {
        super([]); // <--- there is an array. if not set, it's an object
        this.settings = settings;
        this.config = this.settings.config;
        this.source = this.config.users;

        //
        if (Array.isArray(this.source.target)) {
            this.source.target.forEach(target => this.data.push(target));
        } else {
            this.source.keys().forEach(key => this.data[key] = this.source[key]);
        }

        return this.data;
    }
}