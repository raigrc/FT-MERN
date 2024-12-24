import express from "express";
import {
  createUser,
  findAllUser,
  findOneUser,
  updateUser,
  deleteUser,
} from "./users.controller";
import passport from "passport";

const router = express.Router();

router.post("/", createUser);
router.use(passport.authenticate("jwt", { session: false }));
router.get("/", findAllUser);
router.get("/:id", findOneUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
