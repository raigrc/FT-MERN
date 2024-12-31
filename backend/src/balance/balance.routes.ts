import express from "express";
import { getAllBalance } from "./balance.controller";
import passport from "passport";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllBalance
);

export default router;
