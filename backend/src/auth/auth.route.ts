import { Router } from "express";
import { login, signOut, verifyToken } from "./auth.controller";
import passport from "passport";

const router = Router();

router.post("/login", login);
router.get(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  verifyToken
);
router.get(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  signOut
);

export default router;
