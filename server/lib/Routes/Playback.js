import express from "express";

export default class PlaybackRoutes {
    constructor(routes) {
        this.routes = routes;
        this.server = this.routes.server;

        this.router = express.Router();
        this.router.use(express.json({limit: "10mb"}));

        // Routes
        this.router.get('/playback', (req, res) => {
            console.log('>>> PLAYBACK REQUEST RECEIVED');
            return res.status(200).json({message: "SOURCES"});
        });

        // update server settings
        this.router.patch('/playback', (req, res) => {
            console.log('>>> PLAYBACK PATCH REQUEST RECEIVED');
            return res.status(200).json({message: "PLAYBACK PATCH"});
        });
    }
}