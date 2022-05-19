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
        where: { room: rdata },
        order: {
          id: "DESC",
        },
        take: 10,
      });
    })
    .then((data) => {
      res.status(200).send(data);
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
