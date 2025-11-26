import Setting from "./setting.js";
import DataProxy from "../data_proxy.js";

export default class HLSSettings extends Setting {
    constructor(settings) {
        super(settings);

        this.config = this.settings.config;
        this.source = this.config.general;
        this.fields = [
            'hls',
            'hlsEncryption',
            'hlsServerKey',
            'hlsServerCert',
            'hlsAllowOrigins',
            'hlsTrustedProxies',
            'hlsAlwaysRemux',
            'hlsVariant',
            'hlsSegmentCount',
            'hlsSegmentDuration',
            'hlsPartDuration',
            'hlsSegmentMaxSize',
            'hlsDirectory',
            'hlsMuxerCloseAfter',
        ];

        this.on('create', (prop, value) => this.settings.created ? this.settings.setGlobalConfig() : null);
        this.on('update', (prop, value) => this.settings.created ? this.settings.setGlobalConfig() : null);
        this.on('delete', (prop) => this.settings.created ? this.settings.setGlobalConfig() : null);

        // set the data
        this.setFields();

        return this.data;
    }
}