import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import Control from "./controller";
import { createServer } from "http";
import { Server } from "socket.io";
import * as cors from "cors";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      /* options */
      // transports: ['websocket'],
    });

    io.on("connection", (socket) => {});

    httpServer.listen(4000);

    app.use(Control);

    console.log("Server Running");
  })
  .catch((error) => console.log(error));
