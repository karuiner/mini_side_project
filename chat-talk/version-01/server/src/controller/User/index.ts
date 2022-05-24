import * as express from "express";
import { AppDataSource } from "../../data-source";
import { Room } from "../../entity/Room";
import { User } from "../../entity/User";
const user = AppDataSource.getRepository(User);
const router = express.Router();

router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
  user
    .findOne({
      select: { id: true, userName: true, createdAt: true },
      where: { id: id },
    })
    .then((rst) => {
      res.status(200).send(rst);
    })
    .catch(() => {
      res.status(400).send("잘못된 회원 번호 입니다.");
    });
});

router.post("/signin", (req, res) => {
  user
    .findOneOrFail({
      where: { userName: req.body.userName, password: req.body.password },
    })
    .then(() => {
      res.status(200).send("signin");
    })
    .catch((err) => {
      res.status(400).send("error");
    });
});

router.post("/signout", (req, res) => {
  res.send("user signout");
});

router.post("/", (req, res) => {
  user
    .findOneOrFail({
      where: { userName: req.body.userName },
    })
    .then(() => {
      res.status(400).send("동일한 아이디 존재");
    })
    .catch((err) => {
      return user.insert({ ...req.body }).catch(() => {
        res.status(400).send("입력값이 잘못 되었습니다.");
      });
    })
    .then((rst) => {
      res.status(200).send("회원가입을 축하드립니다.");
    });
});

router.patch("/", (req, res) => {
  user
    .update(req.body.id, { ...req.body.data })
    .then(() => {
      res.status(200).send("정보가 업데이트 되었습니다.");
    })
    .catch(() => {
      res.status(400).send("업데이트에 실패하였습니다.");
    });
});

router.delete("/", (req, res) => {
  user
    .delete(req.body.id)
    .then(() => {
      res.status(200).send("정상적으로 탈퇴 되었습니다.");
    })
    .catch(() => {
      res.status(400).send("탈출에 실패하셨습니다.");
    });
});

export default router;
