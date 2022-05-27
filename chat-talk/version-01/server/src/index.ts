import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import Control from "./controller";
import { createServer } from "http";
import { Server } from "socket.io";
import * as cors from "cors";
import { Room } from "./entity/Room";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    const httpServer = createServer(app);
    const room = AppDataSource.getRepository(Room);
    const io = new Server(httpServer, {
      /* options */
      cors: {
        origin: ["http://localhost:3000"],
      },
      // transports: ['websocket'],
    });
    room.find({}).then((x) => {});

    io.on("connection", async (socket) => {
      socket.on("room_set", (req) => {
        req.data.forEach((x) => {
          socket.join(`room${`${x}`.padStart(8, "0")}`);
        });
      });

      socket.on("message_to_server", (req) => {
        let target = `room${`${req.roomId}`.padStart(8, "0")}`;
        console.log(target);
        socket.to(target).emit("message_to_client", { data: req.data });
      });

      socket.emit("chat", "connection ok");
    });

    httpServer.listen(4000);

    app.use(Control);

    console.log("Server Running");
  })
  .catch((error) => console.log(error));
