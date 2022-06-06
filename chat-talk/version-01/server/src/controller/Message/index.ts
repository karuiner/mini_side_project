import * as express from "express";
import { AppDataSource } from "../../data-source";
import { Message } from "../../entity/Message";
import { Room } from "../../entity/Room";
const room = AppDataSource.getRepository(Room);
const message = AppDataSource.getRepository(Message);
const router = express.Router();

router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
  room
    .findOne({ where: { id: id } })
    .then((rdata) => {
      return message.find({
        relations: { user: true },
        select: { user: { userName: true } },
        where: { room: rdata },
        order: {
          id: "ASC",
        },
        take: 10,
      });
    })
    .then((data) => {
      res.status(200).send(
        data.map((x) => {
          return {
            id: x.id,
            message: x.text,
            userName: x.user.userName,
            time: x.createdAt,
          };
        })
      );
    })
    .catch((err) => {
      res.status(400).send("메세지 정보 요청 실패");
    });
});

router.delete("/:id", (req, res) => {
  let id = Number(req.params.id);
  message
    .delete(id)
    .then((data) => {
      res.status(200).send("메세지 삭제");
    })
    .catch((err) => {
      res.status(400).send("메세지 삭제 실패");
    });
});

export default router;
