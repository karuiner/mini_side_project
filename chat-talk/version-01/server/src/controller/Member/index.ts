import * as express from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
const user = AppDataSource.getRepository(User);
const router = express.Router();

router.get("/", (req, res) => {
  res.send("멤버 정보");
});

router.post("/", (req, res) => {
  // user resister
  res.send("멤버 추가");
});

router.delete("/", (req, res) => {
  res.send("멤버 제거");
});

export default router;
