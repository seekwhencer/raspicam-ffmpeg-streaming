import express from "express";

export default class OverviewRoutes {
    constructor(routes) {
        this.routes = routes;
        this.server = this.routes.server;

        this.router = express.Router();
        this.router.use(express.json({limit: "10mb"}));

        // Routes
        this.router.get('/overview', (req, res) => {
            console.log('>>> OVERVIEW REQUEST RECEIVED');
            return res.status(200).json({message: "OVERVIEW"});
        });

        this.router.get('/overview/streams', (req, res) => {
            console.log('>>> OVERVIEW STREAMS REQUEST RECEIVED');
            return res.status(200).json({message: "STREAMS"});
        });

        this.router.get('/overview/viewers', (req, res) => {
            console.log('>>> OVERVIEW VIEWERS REQUEST RECEIVED');
            return res.status(200).json({message: "VIEWERS"});
        });

        this.router.get('/overview/recording', (req, res) => {
            console.log('>>> OVERVIEW RECORDING REQUEST RECEIVED');
            return res.status(200).json({message: "RECORDING"});
        });

        this.router.get('/overview/host', (req, res) => {
            console.log('>>> OVERVIEW HOST REQUEST RECEIVED');
            return res.status(200).json({message: "HOST"});
        });
    }
}