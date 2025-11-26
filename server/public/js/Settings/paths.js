import Setting from "./setting.js";

export default class PathsSettings extends Setting {
    constructor(settings) {
        super(settings);

        this.config = this.settings.config;
        this.source = this.config.paths;

        this.on('create', (prop, value) => this.settings.created ? this.settings.setPathConfig() : null);
        this.on('update', (prop, value) => this.settings.created ? this.settings.setPathConfig() : null);
        this.on('delete', (prop) => this.settings.created ? this.settings.setPathConfig() : null);

        //
        this.source.keys().forEach(key => this.data[key] = this.source[key]);
        return this.data;
    }
}