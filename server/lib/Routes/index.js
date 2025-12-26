import express from "express";
import ConfigRoutes from "./Config.js";
import OverviewRoutes from "./Overview.js";
import ServerRoutes from "./Server.js";
import PathRoutes from "./Path.js";
import SourcesRoutes from "./Sources.js";
import PlaybackRoutes from "./Playback.js";
import RecordingRoutes from "./Recording.js";
import MonitoringRoutes from "./Monitoring.js";

export default class Routes {
    constructor(server) {
        this.server = server;
        this.router = express.Router();
        this.router.use(express.json({limit: "10mb"}));

        // index
        this.router.get('/', (req, res) => {
            console.log('>>> API REQUEST RECEIVED');
            const availableRoutes = [
                ''
            ];
            return res.status(200).json({availableRoutes});
        });

        // config
        this.configRoutes = new ConfigRoutes(this);
        this.router.use(this.configRoutes.router);

        // overview
        this.overviewRoutes = new OverviewRoutes(this);
        this.router.use(this.overviewRoutes.router);

        // server
        this.serverRoutes = new ServerRoutes(this);
        this.router.use(this.serverRoutes.router);

        // path defaults
        this.pathRoutes = new PathRoutes(this);
        this.router.use(this.pathRoutes.router);

        // sources
        this.sourcesRoutes = new SourcesRoutes(this);
        this.router.use(this.sourcesRoutes.router);

        // playback
        this.playbackRoutes = new PlaybackRoutes(this);
        this.router.use(this.playbackRoutes.router);

        // recordings
        this.recordingRoutes = new RecordingRoutes(this);
        this.router.use(this.recordingRoutes.router);

        // monitoring
        this.monitoringRoutes = new MonitoringRoutes(this);
        this.router.use(this.monitoringRoutes.router);
    }

    getRouter() {
        return this.router;
    }
}