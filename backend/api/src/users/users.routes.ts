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
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  findOneUser
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

export default router;
