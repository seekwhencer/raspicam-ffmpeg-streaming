import Setting from "./setting.js";

export default class GeneralSettings extends Setting {
    constructor(settings) {
        super(settings);

        this.config = this.settings.config;
        this.source = this.config.general;
        this.fields = [
            'logLevel',
            'logDestinations',
            'logFile',
            'sysLogPrefix',
            'readTimeout',
            'writeTimeout',
            'writeQueueSize',
            'udpMaxPayloadSize',
            'udpReadBufferSize',
            'runOnConnect',
            'runOnConnectRestart',
            'runOnDisconnect'
        ];

        this.on('create', (prop, value) => this.settings.created ? this.settings.setGlobalConfig() : null);
        this.on('update', (prop, value) => this.settings.created ? this.settings.setGlobalConfig() : null);
        this.on('delete', (prop) => this.settings.created ? this.settings.setGlobalConfig() : null);

        // set the data
        this.setFields();

        return this.data;
    }
}