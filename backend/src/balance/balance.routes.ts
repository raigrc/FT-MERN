import express from "express";
import {
  getAllBalance,
  getBudgets,
  getCategories,
  getOneCategory,
  getTransactionsByMonth,
  getTransactionsWithCategories,
} from "./balance.controller";
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
router.get(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  getCategories
);
router.get(
  "/categories/:id",
  passport.authenticate("jwt", { session: false }),
  getOneCategory
);
router.get(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  getTransactionsWithCategories
);
router.get(
  "/transactions-per-month",
  passport.authenticate("jwt", { session: false }),
  getTransactionsByMonth
);

export default router;
