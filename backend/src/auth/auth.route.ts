import { Router } from "express";
import { login, verifyToken } from "./auth.controller";
import passport from "passport";

const router = Router();

router.post("/login", login);
router.get(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  verifyToken
);

export default router;
