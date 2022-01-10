import express, { Application } from "express";
import http, { Server } from "http";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import "colorts/lib/string";
import "module-alias/register";

import apikey from "./middlewares/apikey";
import config from "./environment";
import initMongo from "./lib/database";
import logInfo from "@utilities/console/logInfo";
import logger from "./lib/logger";

dotenv.config({ path: __dirname + "/../.env" });
const { port, database, environment, appName, args } = config();

const app: Application = express();
const server: Server = http.createServer(app);

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

initMongo(database.uri).then(() => {
  server.listen(port, () => {
    logger.error("as");
    console.log(logInfo(`Server started on http://localhost:${port}`));
  });
});
