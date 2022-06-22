import { Server } from "socket.io";

const io = new Server(4000, {
  /* options */
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("test", (req) => {
    console.log(req);
  });
});
