type AppConfig = {
  environment: string | undefined;
  port: string | undefined;
  appName: string | undefined;
  database: DatabaseConfig;
  args: Array<any>;
};

type DatabaseConfig = {
  uri: string;
  options: {
    dbName: string | undefined;
    user: string | undefined;
    pass: string | undefined;
  };
};
