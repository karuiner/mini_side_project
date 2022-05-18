import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import Control from "./controller";
import { createServer } from "http";
import { Server } from "socket.io";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      /* options */
    });

    io.on("connection", (socket) => {
      // ...
    });

    httpServer.listen(4000);

    app.use(Control);

    console.log("Server Running");
  })
  .catch((error) => console.log(error));
