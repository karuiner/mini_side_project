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
  rooms = { 로비: "room00000000" },
  roomId = 1,
  users: { [key: string]: boolean } = {};

io.on("connection", (socket) => {
  let userName = `Guest-${`${unumber}`.padStart(8, "0")}`;
  socket.data.userName = userName;
  socket.data.roomName = "로비";
  users[userName] = true;
  socket.emit("Login", { userName: userName, users: Object.keys(users) });
  socket.join(rooms["로비"]);
  socket
    .to(rooms["로비"])
    .emit("Ologin", { userName: userName, users: Object.keys(users) });
  unumber++;

  socket.on("Name-Change", (req) => {
    socket.to(req.roomName).emit("Orther-Name-Change", {
      oldName: socket.data.userName,
      newName: req.userName,
    });
  });

  // 새방 만들기
  socket.on("new-room", (req) => {
    if (rooms[req.roomName] === undefined) {
      rooms[req.roomName] = `room${roomId}`.padStart(8, "0");
      roomId++;
      socket.to(rooms[req.roomName]).emit("new-room", {
        roomName: req.roomName,
      });
      socket.emit("new-room", {
        roomName: req.roomName,
      });
    } else {
      socket.emit("used-roomName", "사용 된 방이름");
    }
  });

  // 방 입장
  socket.on("join-room", (req) => {
    socket.data.roomName = req.roomName;
    socket.join(rooms[req.roomName]);
    socket.to(rooms[req.roomName]).emit("join-room", {
      userName: socket.data.userName,
    });
    socket.emit("join-room", {
      userName: socket.data.userName,
    });
  });

  // 방 퇴장 - 좀더 확인해볼 것
  socket.on("room-out", (req) => {});

  // 방 이름 변경
  socket.on("room-name-change", (req) => {
    let roomIh = rooms[req.oldRoomName];
    delete rooms[req.oldRoomName];
    rooms[req.newRoomName] = roomIh;
    socket.to(req.roomName).emit("room-name-change", {
      oldName: req.oldRoomName,
      newName: req.newRoomName,
    });
    socket.emit("room-name-change", {
      oldName: req.oldRoomName,
      newName: req.newRoomName,
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
