import express from "express";

export default class SourcesRoutes {
    constructor(routes) {
        this.routes = routes;
        this.server = this.routes.server;

        this.router = express.Router();
        this.router.use(express.json({limit: "10mb"}));

        // Routes
        this.router.get('/sources', (req, res) => {
            console.log('>>> SOURCES REQUEST RECEIVED');
            return res.status(200).json({message: "SOURCES"});
        });

        // update server settings
        this.router.patch('/sources', (req, res) => {
            console.log('>>> SOURCES PATCH REQUEST RECEIVED');
            return res.status(200).json({message: "SOURCES PATCH"});
        });
    }
}