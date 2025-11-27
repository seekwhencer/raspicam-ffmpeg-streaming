import express from "express";

export default class ServerRoutes {
    constructor(routes) {
        this.routes = routes;
        this.server = this.routes.server;

        this.router = express.Router();
        this.router.use(express.json({limit: "10mb"}));

        // Routes
        this.router.get('/server', (req, res) => {
            console.log('>>> SERVER REQUEST RECEIVED');
            return res.status(200).json({message: "SERVER"});
        });

        // update server settings
        this.router.patch('/server', (req, res) => {
            console.log('>>> SERVER PATCH REQUEST RECEIVED');
            return res.status(200).json({message: "SERVER PATCH"});
        });
    }
}