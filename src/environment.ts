import minimist from "minimist";

import logInfo from "@utilities/console/logInfo";

export default function config(): AppConfig {
  const argv = minimist(process.argv.slice(2));
  const useApiKey: string = argv["api-key"];

  let database;
  let port;
  let environment;
  const appName = process.env.APP_NAME;

  if (argv.dev) {
    /**
     * Development environment
     */
    database = "development";
    environment = "development";
    port = process.env.DEV_PORT;
  } else if (argv.staging) {
    /**
     * Staging environment
     */
    database = "staging";
    environment = "staging";
    port = process.env.STAG_PORT;
  } else if (argv.prod) {
    /**
     * Production environment
     */
    database = "production";
    environment = "production";
    port = process.env.PROD_PORT;
  } else {
    throw new Error("No environment set");
  }

  logInfo(`Active DB: ${database.magenta.bold}`);

  const config = {
    environment,
    port,
    appName,
    database: {
      uri: `mongodb://${process.env.DB_USER_USERNAME}:${process.env.DB_USER_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${database}?authSource=${process.env.DB_AUTH_SOURCE}`,
      options: {
        dbName: database,
        user: process.env.DB_ROOT_USERNAME,
        pass: process.env.DB_ROOT_PASSWORD,
      },
    },
    args: [{ useApiKey }],
  };

  return config;
}
