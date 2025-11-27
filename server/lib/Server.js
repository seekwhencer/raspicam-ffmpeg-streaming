import express from "express";

import Events from './EventEmitter.js';
import MediamtxProxy from "./MediamtxProxy.js";
import Routes from "./Routes/index.js";

export default class Server extends Events {
    constructor(app) {
        super();

        this.app = app;
        this.publicDir = this.app.publicDir;
        this.dataDir = this.app.dataDir;
        this.port = process.env.SERVER_PORT || 3000;

        this.engine = express();
        this.engine.use(express.json());
        this.engine.use(express.static(this.publicDir));

        // the mediamtx api proxy
        this.mediamtxProxy = new MediamtxProxy(this, {
            targetBaseUrl: "http://mediamtx:9997/v3",
            apiUser: false,
            apiPassword: false,

            // optional: eigene Auth (JWT, API-Key, whatever)
            beforeProxy: (req, res) => {
                /*if (req.headers["x-api-key"] !== "meinkey") {
                    res.status(401).json({ error: "Unauthorized" });
                    return false;
                }*/
                return true;
            }
        });
        this.engine.use('/mediamtx', this.mediamtxProxy.router);

        //
        this.routes = new Routes(this);
        this.engine.use('/api', this.routes.router);
    }

    async run() {
        await this.engine.listen(this.port, () => {
            console.log(`SERVER IS RUNNING ON PORT `.padEnd(30, '.'), this.port);
        });
    }
}
