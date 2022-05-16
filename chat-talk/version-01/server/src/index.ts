import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import Control from "./controller";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());

    app.listen(4000);
    app.use(Control);

    console.log("Server Running");
  })
  .catch((error) => console.log(error));
