import { connect } from "mongoose";
import logInfo from "@utilities/console/logInfo";

export default async function initDatabase(mongoUri: string): Promise<boolean> {
  const defaultOptions = {
    useNewUrlParser: true,
    autoIndex: false,
    useCreateIndex: true, //produces error
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    useUnifiedTopology: true,
  };

  return await connect(mongoUri, defaultOptions)
    .then(() => {
      console.log(logInfo(`${"Established database connection"}`));
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
