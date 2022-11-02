import { Request, Response } from "express";
import listEndpoints from "express-list-endpoints";
import _ from "lodash";

const listEndpointsMiddleware = (req: Request, res: Response) => {
  const app = req.app.get("app");
  const list = listEndpoints(app);

  let result = _.transform(list, (element: any, value: any, key: any) => {
    element[key] = _.omit(value, "middlewares");
  });

  return res.status(200).json(result);
};

export default listEndpointsMiddleware;
