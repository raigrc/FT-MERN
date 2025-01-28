import express from "express";
import {
  createBudget,
  deleteBudget,
  findAllBudgets,
  findOneBudget,
  updateBudget,
} from "./budget.controller";
import passport from "passport";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createBudget
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  findAllBudgets
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  findOneBudget
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateBudget
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteBudget
);

export default router;
