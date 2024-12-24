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
router.get("/", passport.authenticate("jwt", { session: false }), findAllUser);
router.get("/:id", findOneUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
