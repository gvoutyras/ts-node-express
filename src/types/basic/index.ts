type AppConfig = {
  environment: string | undefined;
  port: string | undefined;
  database: DatabaseConfig | undefined;
};

type DatabaseConfig = {
  uri: string | undefined;
  options: {
    dbName: string | undefined;
    user: string | undefined;
    pass: string | undefined;
  };
};
