import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import Control from "./controller";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import * as cors from "cors";
import { Room } from "./entity/Room";
import { Member } from "./entity/Member";
import { Message } from "./entity/Message";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    const httpServer = createServer(app);
    const user = AppDataSource.getRepository(User);
    const room = AppDataSource.getRepository(Room);
    const member = AppDataSource.getRepository(Member);
    const message = AppDataSource.getRepository(Message);

    const io = new Server(httpServer, {
      /* options */
      cors: {
        origin: ["http://localhost:3000"],
      },
      // transports: ['websocket'],
    });
    app.use(Control);

    io.on("connection", function (socket) {
      socket.data.roomName = "";

      socket.on("room_in", function (req) {
        user
          .findOneOrFail({
            select: {
              id: true,
              userName: true,
            },
            where: { id: req.userId },
          })
          .then((suser) => {
            socket.data.user = suser;
            return room
              .findOneOrFail({ where: { id: req.roomId } })
              .then((sroom) => {
                socket.data.room = sroom;
              });
          })
          .then(() => {
            let target = `room${`${req.roomId}`.padStart(8, "0")}`;
            socket.join(target);
            socket.data.roomName = target;
          });
      });
      socket.on("disconnect", function (req) {});

      socket.on("message", function (req) {
        message
          .insert({
            user: socket.data.user,
            room: socket.data.room,
            text: req.data.message,
          })
          .then(() => {
            return room.update(socket.data.room.id, {
              lastMessage: req.data.message,
            });
          })
          .then(() => {
            socket.to(socket.data.roomName).emit("message", { data: req.data });
          });
      });
    });

    httpServer.listen(4000);

    console.log("Server Running");
  })
  .catch((error) => console.log(error));
