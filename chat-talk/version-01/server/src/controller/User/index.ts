import * as express from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
const user = AppDataSource.getRepository(User);
const router = express.Router();

router.get("/:id", (req, res) => {
  res.send("get user data");
});

router.get("/", (req, res) => {
  res.send("get users data");
});

router.post("/signin", (req, res) => {
  res.send("user signin");
});

router.post("/signout", (req, res) => {
  res.send("user signout");
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
