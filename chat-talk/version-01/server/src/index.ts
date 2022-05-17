import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import Control from "./controller";
import { createServer } from "http";
import { Server } from "socket.io";
import * as cors from "cors";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(bodyParser.json());
    //    app.use(cors());
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: ["http://localhost:3000"],
      },
    });

    io.on("connection", (socket) => {
      socket.join("room");
      console.log("connect client by Socket.io");
      // socket.on("first Request", (req) => {
      //   console.log(req);
      //   socket.emit("first Respond", { data: "firstRespond" });
      // });
      socket.on("message", (req) => {
        console.log(req);
        socket.to("room").emit("log", req);
        socket.emit("log", req);
      });
    });

    httpServer.listen(4000);

    app.use(Control);

    console.log("Server Running");
  })
  .catch((error) => console.log(error));
