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
// room 은 모든 유저들에게서 독립적으로 존재.
let db: data = {},
  rooms: { [key: string]: string } = { 로비: "room00000000" },
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
  socket.on("disconnect", () => {
    delete users[socket.data.userName];
    console.log(socket.data.userName);
  });

  socket.on("Name-Change", (req) => {
    delete users[socket.data.userName];
    users[req.userName] = true;
    socket.data.userName = req.userName;
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
      socket.emit("new-room", { result: true, roomName: req.roomName });
    } else {
      socket.emit("new-room", { result: false, roomName: req.roomName });
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

  // 방 퇴장
  socket.on("room-out", (req) => {
    socket.leave(rooms[req.roomName]);
    socket
      .to(rooms[req.roomName])
      .emit("room-out", `${socket.data.userName}님이 퇴장하였습니다.`);
    socket.emit("room-out", "success");
  });

  // 방 이름 변경
  socket.on("room-name-change", (req) => {
    let roomIh = rooms[req.oldRoomName];
    delete rooms[req.oldRoomName];
    rooms[req.newRoomName] = roomIh;
    socket.to(rooms[req.roomName]).emit("room-name-change", {
      oldName: req.oldRoomName,
      newName: req.newRoomName,
    });
    socket.emit("room-name-change", {
      oldName: req.oldRoomName,
      newName: req.newRoomName,
    });
  });

  // 메세지 전송
  // time type Date
  socket.on("message", (req) => {
    let htime = new Date();
    let time = htime.toISOString().split("T");
    let day = new Intl.DateTimeFormat("ko-KR", { weekday: "long" }).format(
      htime
    );
    let times = time[0].split("-");
    let hday = `${times[0]}년 ${times[1]}월 ${times[2]}일 ${day}`;
    let smsg = {
      type: "message",
      cday: hday,
      message: {
        userName: req.userName,
        message: req.message,
        time: time[1].split(".")[0],
      },
    };

    socket.to(rooms[socket.data.roomName]).emit("message", smsg);
    socket.emit("message", smsg);
  });
});
