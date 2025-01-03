import express from "express";
import { getAllBalance, getBudgets } from "./balance.controller";
import passport from "passport";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllBalance
);
router.get(
  "/budgets",
  passport.authenticate("jwt", { session: false }),
  getBudgets
);

export default router;
