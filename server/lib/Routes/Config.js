import express from "express";
import * as yaml from "js-yaml";
import {parse, stringify} from 'yaml';


export default class ConfigRoutes {
    constructor(routes) {
        this.routes = routes;
        this.server = this.routes.server;
        this.app = this.server.app;
        this.config = this.app.config;

        this.router = express.Router();
        this.router.use(express.json({limit: "10mb"}));

        // Routes
        this.router.get('/config', async (req, res) => {
            const yml = await this.config.getYaml();
            return res.status(200).send(yml);
        });

        // update server settings
        this.router.patch('/config', (req, res) => {
            console.log('>>> CONFIG PATCH REQUEST RECEIVED');
            return res.status(200).json({message: "CONFIG PATCH"});
        });
    }
}