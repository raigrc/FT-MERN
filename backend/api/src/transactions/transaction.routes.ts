import express from "express";
import {
  createTransaction,
  deleteTransaction,
  findAllTransactions,
  findOneTransaction,
  updateTransaction,
} from "./transaction.controller";
import passport from "passport";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createTransaction
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  findAllTransactions
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  findOneTransaction
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateTransaction
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteTransaction
);

export default router;
