import express, { Express } from "express";
import http, { Server } from "http";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import listEndpoints from "express-list-endpoints";
import _ from "lodash";
import "colorts/lib/string";
import "module-alias/register";

import apikey from "./middlewares/apikey";
import config from "./environment";
import initMongo from "./lib/database";
import logInfo from "@utilities/console/logInfo";
import listEndpointsMiddleware from "@middlewares/listEndpoints";

dotenv.config({ path: __dirname + "/../.env" });
const { port, database, environment, appName, args } = config();

const app: Express = express();
const server: Server = http.createServer(app);

// pass refference to self, accessible from everywhere
app.set("app", app);

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(apikey);

app.get("/", (req, res) =>
  res.json(`Project ${appName} active on ${environment} mode`)
);

app.get("/diag", (req, res) => {
  res.json({ port, environment, appName, args });
});

app.use("*/list", listEndpointsMiddleware);

initMongo(database.uri).then(() => {
  server.listen(port, () => {
    logInfo(`Server started on http://localhost:${port}`);
  });
});
