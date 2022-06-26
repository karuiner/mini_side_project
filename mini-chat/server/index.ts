import { Server } from "socket.io";

const io = new Server(4000, {
  /* options */
  cors: {
    origin: ["http://localhost:3000", "*"],
  },
});
let unumber = 0;
interface user {
  userName: string;
  roomName: string;
}
interface data {
  [key: string]: user;
}

let db: data = {},
  users: { [key: string]: boolean } = {};

io.on("connection", (socket) => {
  let userName = `Guest-${`${unumber}`.padStart(8, "0")}`;
  socket.data.userName = userName;
  socket.data.roomName = "로비";
  users[userName] = true;
  socket.emit("Login", { userName: userName, users: Object.keys(users) });
  socket.join("로비");
  socket
    .to("로비")
    .emit("Ologin", { userName: userName, users: Object.keys(users) });
  unumber++;

  socket.on("Name-Change", (req) => {
    socket.to(req.roomName).emit("Orther-Name-Change", {
      oldName: socket.data.userName,
      newName: req.userName,
    });
  });

  // socket.on("Room-Name-Change", (req) => {
  //   socket.to(req.roomName).emit("Orther-Name-Change", {
  //     oldName: socket.data.userName,
  //     newName: req.userName,
  //   });
  // });

  // socket.on("Login", () => {
  //   socket.emit("Login", { userName: userName });
  //   unumber++;
  // });

  socket.on("test", (req) => {
    console.log(req);
  });
});
