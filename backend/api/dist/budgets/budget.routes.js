"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const budget_controller_1 = require("./budget.controller");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post("/", passport_1.default.authenticate("jwt", { session: false }), budget_controller_1.createBudget);
router.get("/", passport_1.default.authenticate("jwt", { session: false }), budget_controller_1.findAllBudgets);
router.get("/:id", passport_1.default.authenticate("jwt", { session: false }), budget_controller_1.findOneBudget);
router.put("/:id", passport_1.default.authenticate("jwt", { session: false }), budget_controller_1.updateBudget);
router.delete("/:id", passport_1.default.authenticate("jwt", { session: false }), budget_controller_1.deleteBudget);
exports.default = router;
