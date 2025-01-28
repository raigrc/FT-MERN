"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const balance_controller_1 = require("./balance.controller");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/", passport_1.default.authenticate("jwt", { session: false }), balance_controller_1.getAllBalance);
router.get("/budgets", passport_1.default.authenticate("jwt", { session: false }), balance_controller_1.getBudgets);
router.get("/categories", passport_1.default.authenticate("jwt", { session: false }), balance_controller_1.getCategories);
router.get("/categories/:id", passport_1.default.authenticate("jwt", { session: false }), balance_controller_1.getOneCategory);
router.get("/transactions", passport_1.default.authenticate("jwt", { session: false }), balance_controller_1.getTransactionsWithCategories);
router.get("/transactions-per-month", passport_1.default.authenticate("jwt", { session: false }), balance_controller_1.getTransactionsByMonth);
exports.default = router;
