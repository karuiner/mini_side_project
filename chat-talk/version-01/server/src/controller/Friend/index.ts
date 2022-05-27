import * as express from "express";
import { AppDataSource } from "../../data-source";
import { Friend } from "../../entity/Friend";
import { User } from "../../entity/User";
const user = AppDataSource.getRepository(User);
const friend = AppDataSource.getRepository(Friend);
const router = express.Router();

router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
  friend
    .find({
      select: { puser: { id: true, userName: true, statusMessage: true } },
      relations: { puser: true },
      where: { user: { id: id } },
      order: { puser: { userName: "ASC" } },
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(400).send("fail");
    });
});

router.post("/", (req, res) => {
  let [hid, fid] = [req.body.hostId, req.body.friendId];
  user
    .findOne({ where: { id: hid } })
    .then((h) => {
      return user.findOne({ where: { id: fid } }).then((f) => {
        return friend.insert({ user: h, puser: f });
      });
    })
    .then((data) => {
      res.status(200).send("success");
    })
    .catch(() => {
      res.status(400).send("fail");
    });
});

router.delete("/:id", (req, res) => {
  let id = Number(req.params.id);
  friend
    .delete(id)
    .then((data) => {
      res.status(200).send("success");
    })
    .catch(() => {
      res.status(400).send("fail");
    });
});

export default router;
