import express from "express";
import {
  createCategory,
  deleteCategory,
  findAllCategories,
  findOneCategory,
  updateCategory,
} from "./categories.controller";
import passport from "passport";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createCategory
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  findAllCategories
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  findOneCategory
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateCategory
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteCategory
);

export default router;
