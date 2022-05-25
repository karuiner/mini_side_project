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
      select: {
        id: true,
        userName: true,
        statusMessage: true,
        email: true,
        createdAt: true,
      },
      where: { id: id },
    })
    .then((rst) => {
      res.status(200).send(rst);
    })
    .catch(() => {
      res.status(400).send("잘못된 회원 번호 입니다.");
    });
});

router.get("/name/:name", (req, res) => {
  user
    .findOne({
      select: {
        id: true,
        userName: true,
        statusMessage: true,
      },
      where: { userName: req.params.name },
    })
    .then((rst) => {
      res.status(200).send(rst);
    })
    .catch(() => {
      res.status(400).send("잘못된 회원 이름입니다.");
    });
});

router.post("/signin", (req, res) => {
  user
    .findOneOrFail({
      select: {
        id: true,
        userName: true,
        statusMessage: true,
        email: true,
        createdAt: true,
      },
      where: { userName: req.body.userName, password: req.body.password },
    })
    .then((x) => {
      res.status(200).send({ ...x });
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
      return user
        .insert({ ...req.body, statusMessage: "" })
        .then((x) => {
          return x.identifiers[0].id;
        })
        .catch(() => {
          res.status(400).send("입력값이 잘못 되었습니다.");
        });
    })
    .then((rst) => {
      return user.findOneOrFail({
        select: {
          id: true,
          userName: true,
          statusMessage: true,
          email: true,
          createdAt: true,
        },
        where: { id: rst },
      });
    })
    .then((rst) => {
      res.status(200).send(rst);
    })
    .catch(() => {
      res.status(400).send("회원 등록을 실패하였습니다.");
    });
});

router.patch("/", (req, res) => {
  console.log(req.body.data);
  user
    .update(req.body.id, { ...req.body.data })
    .then(() => {
      res.status(200).send("정보가 업데이트 되었습니다.");
    })
    .catch(() => {
      res.status(400).send("업데이트에 실패하였습니다.");
    });
});

router.delete("/:id", (req, res) => {
  let id = Number(req.params.id);
  user
    .delete(id)
    .then(() => {
      res.status(200).send("정상적으로 탈퇴 되었습니다.");
    })
    .catch(() => {
      res.status(400).send("탈출에 실패하셨습니다.");
    });
});

export default router;
