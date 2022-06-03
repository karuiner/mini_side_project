import * as express from "express";
import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Member } from "../../entity/Member";
import { Room } from "../../entity/Room";
import { User } from "../../entity/User";
const user = AppDataSource.getRepository(User);
const room = AppDataSource.getRepository(Room);
const member = AppDataSource.getRepository(Member);
const router = express.Router();

router.get("/:id", (req, res) => {
  //id= room_id
  let id = Number(req.params.id);
  room
    .findOne({
      select: { member: { id: true, user: { id: true, userName: true } } },
      relations: { member: { user: true } },
      where: { id: id },
    })
    .then((x) => {
      res.status(200).send(x.member);
    })
    .catch((err) => {
      res.status(400).send("fail");
    });
});

router.post("/", (req, res) => {
  let [uid, rid] = [req.body.userId, req.body.roomId];
  room
    .findOne({ where: { id: rid } })
    .then((rdata) => {
      return user.findOne({ where: { id: uid } }).then((udata) => {
        return member.insert({ user: udata, room: rdata });
      });
    })
    .then(() => {
      res.status(200).send("멤버 추가 완료");
    })
    .catch(() => {
      res.status(400).send("멤버 추가 실패");
    });
});

router.post("/many", (req, res) => {
  let [uids, rid] = [req.body.userIds, req.body.roomId];
  room
    .findOne({ where: { id: rid } })
    .then((rdata) => {
      return user.find({ where: { id: In(uids) } }).then((udata) => {
        let data = udata.map((x) => {
          return { user: x, room: rdata };
        });
        return member.insert(data);
      });
    })
    .then(() => {
      res.status(200).send("멤버 추가 완료");
    })
    .catch(() => {
      res.status(400).send("멤버 추가 실패");
    });
});

router.delete("/:id", (req, res) => {
  let id = Number(req.params.id);
  member
    .findOneOrFail({
      relations: { room: { member: true } },
      where: { id: id },
    })
    .then((imember) => {
      let k = imember.room.member.length;
      if (k > 1) {
        return member.delete(id);
      } else {
        return member.delete(id).then(() => {
          return room.delete(imember.room.id);
        });
      }
    })
    .then(() => {
      res.status(200).send("멤버 제거 완료");
    })
    .catch(() => {
      res.status(400).send("멤버 제거 실패");
    });
});

export default router;
