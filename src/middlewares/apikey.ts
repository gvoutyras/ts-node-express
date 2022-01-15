import { NextFunction, Request, Response } from "express";
import minimist from "minimist";

const apikey = (req: Request, res: Response, next: NextFunction) => {
  const argv = minimist(process.argv.slice(2));
  const useApiKey: string = argv["api-key"];

  if (useApiKey || useApiKey === undefined) {
    const apiKey = req.header("x-api-key");

    if (apiKey === process.env.FIXED_API_KEY) {
      return next();
    } else {
      return res
        .status(403)
        .json({ status: false, code: 403, message: "Invalid API key" });
    }
  }
  return next();
};

export default apikey;
