import * as express from "express";
import { AppDataSource } from "../../data-source";
import { Friend } from "../../entity/Friend";
import { User } from "../../entity/User";
const user = AppDataSource.getRepository(User);
const friend = AppDataSource.getRepository(Friend);
const router = express.Router();

router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
});

router.post("/", (req, res) => {
  // user resister
  res.send("user resister");
});

router.patch("/", (req, res) => {
  res.send("user update");
});

router.delete("/", (req, res) => {
  res.send("user remove");
});

export default router;
