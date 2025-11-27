import express from "express";

export default class RecordingRoutes {
    constructor(routes) {
        this.routes = routes;
        this.server = this.routes.server;

        this.router = express.Router();
        this.router.use(express.json({limit: "10mb"}));

        // Routes
        this.router.get('/recording', (req, res) => {
            console.log('>>> RECORDING REQUEST RECEIVED');
            return res.status(200).json({message: "RECORDING"});
        });

        // update server settings
        this.router.patch('/recording', (req, res) => {
            console.log('>>> RECORDING PATCH REQUEST RECEIVED');
            return res.status(200).json({message: "RECORDING PATCH"});
        });
    }
}