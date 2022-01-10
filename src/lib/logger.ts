import { createLogger, format, Logger, transports } from "winston";
import { DailyRotateFileTransportOptions } from "winston-daily-rotate-file";
import "winston-daily-rotate-file";
import fs from "fs";

let logger: Logger;

const logsDir = "./logs";

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const options: DailyRotateFileTransportOptions = {
  filename: `combined.%DATE%.log`,
  dirname: logsDir,
  level: "info",
  handleExceptions: true,
  json: false,
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: format.combine(format.timestamp(), format.json()),
};

const combinedTransport = new transports.DailyRotateFile(options);

logger = createLogger({
  format: format.json(),
  transports: [combinedTransport],
});

export default logger;
