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
    .find({
      select: {
        room: {
          id: true,
          roomName: true,
          type: true,
          lastMessage: true,
          member: { id: true, user: { id: true, userName: true } },
        },
      },
      relations: { room: { member: { user: true } } },
      where: { user: { id: id } },
      order: { room: { id: "ASC", member: { id: "ASC" } } },
    })
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

router.get("/private/:id/:id2", (req, res) => {
  let id = Number(req.params.id);
  let id2 = Number(req.params.id2);
  user
    .findOneOrFail({
      select: {
        member: {
          id: true,
          room: { id: true, type: true },
        },
      },
      relations: { member: { room: true, user: true } },
      where: {
        id: id,
        member: {
          room: { type: "private" },
        },
      },
      order: { member: { id: "ASC", room: { id: "ASC" } } },
    })
    .then((x) => {
      let rooms: number[] = [];
      console.log(x.member);
      x.member.forEach((x) => {
        rooms.push(x.room.id);
      });
      return room.findOneOrFail({
        select: { id: true, member: {} },
        relations: { member: { user: true } },
        where: [
          ...rooms.map((x) => {
            return { id: x, member: { user: { id: id2 } } };
          }),
        ],
      });
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
    .insert({ roomName: roomName, type: req.body.type, lastMessage: "" })
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
