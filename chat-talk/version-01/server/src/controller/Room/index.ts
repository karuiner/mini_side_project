import * as express from "express";
import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Member } from "../../entity/Member";
import { Room } from "../../entity/Room";
import { User } from "../../entity/User";
const member = AppDataSource.getRepository(Member);
const room = AppDataSource.getRepository(Room);
const user = AppDataSource.getRepository(User);
const router = express.Router();

router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
  member
    .find({ relations: { room: true }, where: { user: { id: id } } })
    .then((x) => {
      let rooms = [];
      x.forEach((x) => {
        rooms.push(x.room);
      });
      return rooms;
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send("fail");
    });
});

router.post("/", (req, res) => {
  let roomName = req.body.roomName ? req.body.roomName : "",
    uids = req.body.userIds;
  room
    .insert({ roomName: roomName, lastMessage: "" })
    .then((x) => {
      return room.findOne({ where: { id: x.identifiers[0].id } });
    })
    .then((room) => {
      return user.find({ where: { id: In(uids) } }).then((udata) => {
        let data = udata.map((x) => {
          return { user: x, room: room };
        });
        return member.insert(data);
      });
    })
    .then((x) => {
      res.status(200).send("대화방 생성");
    })
    .catch((err) => {
      res.status(400).send("대화방 생성 실패");
    });
});

router.patch("/", (req, res) => {
  room
    .update(req.body.id, { roomName: req.body.roomName })
    .then((x) => {
      res.status(200).send("대화방 이름 수정");
    })
    .catch((err) => {
      res.status(400).send("대화방 이름 수정 실패");
    });
});

router.delete("/:id", (req, res) => {
  let id = Number(req.params.id);
  room
    .delete(id)
    .then((x) => {
      res.status(200).send("대화방 삭제");
    })
    .catch((err) => {
      res.status(400).send("대화방 삭제 실패");
    });
});

export default router;
