import express from "express";
import { URL } from "url";

export default class MediamtxProxy {
    /**
     * @param {Object} options
     * @param {string} options.targetBaseUrl
     * @param {string} [options.apiUser]        - MediaMTX API-User
     * @param {string} [options.apiPassword]    - MediaMTX API-Passwort
     * @param {Function} [options.beforeProxy]  - optionaler Hook: (req, res) => boolean | Promise<boolean>
     */
    constructor(server, {targetBaseUrl, apiUser = null, apiPassword = null, beforeProxy = null }) {
        if (!targetBaseUrl) throw new Error("targetBaseUrl fehlt.");

        this.server = server;
        this.targetBaseUrl = targetBaseUrl.replace(/\/$/, "");
        this.beforeProxy = beforeProxy;

        this.basicAuthHeader = null;
        if (apiUser && apiPassword) {
            const token = Buffer.from(`${apiUser}:${apiPassword}`).toString("base64");
            this.basicAuthHeader = `Basic ${token}`;
        }

        this.router = express.Router();
        this._register();
    }

    /**
     * Proxy-Handler
     */
    async _proxy(req, res) {
        try {
            if (this.beforeProxy) {
                const ok = await this.beforeProxy(req, res);
                if (!ok) return; // Hook übernimmt Fehlerantwort
            }
            const targetUrl = new URL(
                `/v3${req.path}`,
                this.targetBaseUrl
            );

            // Query anhängen
            for (const [k, v] of Object.entries(req.query)) {
                targetUrl.searchParams.set(k, v);
            }

            // Header setzen
            const headers = {};

            if (this.basicAuthHeader) {
                headers["Authorization"] = this.basicAuthHeader;
            }

            if (req.headers["content-type"]) {
                headers["content-type"] = req.headers["content-type"];
            }

            const fetchOptions = {
                method: req.method,
                headers,
            };

            // Body bei Bedarf weitergeben
            if (["POST", "PATCH", "PUT"].includes(req.method)) {
                fetchOptions.body = JSON.stringify(req.body);
            }

            const response = await fetch(targetUrl, fetchOptions);
            const text = await response.text();

            try {
                return res.status(response.status).json(JSON.parse(text));
            } catch {
                return res.status(response.status).send(text);
            }
        } catch (err) {
            console.error("Proxy-Fehler:", err);
            return res.status(502).json({ error: "Bad Gateway", detail: err.message });
        }
    }

    /**
     * Registrierung aller MediaMTX-API-Routen
     */
    _register() {
        const r = this.router;

        //r.use(express.json({ limit: "10mb" }));

        const routes = [
            'GET /info',
            'POST /auth/jwks/refresh',

            'GET /config/global/get',
            'PATCH /config/global/patch',
            'GET /config/pathdefaults/get',
            'PATCH /config/pathdefaults/patch',

            'GET /config/paths/list',
            'GET /config/paths/get/:name',
            'POST /config/paths/add/:name',
            'PATCH /config/paths/patch/:name',
            'POST /config/paths/replace/:name',
            'DELETE /config/paths/delete/:name',

            'GET /hlsmuxers/list',
            'GET /hlsmuxers/get/:name',

            'GET /paths/list',
            'GET /paths/get/:name',

            'GET /rtspconns/list',
            'GET /rtspconns/get/:id',

            'GET /rtspsessions/list',
            'GET /rtspsessions/get/:id',
            'POST /rtspsessions/kick/:id'
        ];

        for (const entry of routes) {
            const [method, path] = entry.split(" ");
            r[method.toLowerCase()](path, this._proxy.bind(this));
        }
    }
}
