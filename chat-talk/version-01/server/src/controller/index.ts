import * as express from "express";
import User from "./User";
import Member from "./Member";
import Friend from "./Friend";
import Message from "./Message";
import Room from "./Room";

const router = express.Router();

router.use("/user", User);
router.use("/message", Message);
router.use("/member", Member);
router.use("/room", Room);
router.use("/friend", Friend);

export default router;
