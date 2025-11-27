import Setting from "./setting.js";

export default class ApiSettings extends Setting {
    constructor(settings) {
        super(settings);

        this.config = this.settings.config;
        this.source = this.config.general;
        this.fields = [
            'api',
            'apiAddress',
            'apiEncryption',
            'apiServerKey',
            'apiServerCert',
            'apiAllowOrigins',
            'apiTrustedProxies'
        ];

        this.nailed = this.fields;

        this.on('create', (prop, value) => this.settings.created ? this.settings.setGlobalConfig() : null);
        this.on('update', (prop, value) => this.settings.created ? this.settings.setGlobalConfig() : null);
        this.on('delete', (prop) => this.settings.created ? this.settings.setGlobalConfig() : null);

        // set the data
        this.setFields();

        return this.data;
    }
}