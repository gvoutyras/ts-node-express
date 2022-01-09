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

dotenv.config({ path: __dirname + "/../.env" });
const { port } = config();

const app: Application = express();
const server: Server = http.createServer(app);

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(apikey);

app.post("/test", (req, res) => {
  res.json(req.body.data);
});

// Starting the server
server.listen(port, () => {
  console.log(`SERVER RUNNING ON ${port}`);
});
