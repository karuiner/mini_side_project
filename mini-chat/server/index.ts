import { Server } from "socket.io";

const io = new Server(4000, {
  /* options */
  cors: {
    origin: ["http://localhost:3000", "*"],
  },
});
let unumber = 0;
let db = {};

io.on("connection", (socket) => {
  let userName = `Guest-${`${unumber}`.padStart(8, "0")}`;
  socket.emit("Login", { userName: userName });
  unumber++;
  // socket.on("Login", () => {
  //   socket.emit("Login", { userName: userName });
  //   unumber++;
  // });

  socket.on("test", (req) => {
    console.log(req);
  });
});
