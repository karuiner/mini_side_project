import * as express from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
const user = AppDataSource.getRepository(User);
const router = express.Router();

router.get("/", (req, res) => {
  res.send("get users data");
});

router.post("/", (req, res) => {
  // user resister
  res.send("user resister");
});

router.delete("/", (req, res) => {
  res.send("user remove");
});

export default router;
