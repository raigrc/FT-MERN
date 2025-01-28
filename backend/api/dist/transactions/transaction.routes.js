"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("./transaction.controller");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post("/", passport_1.default.authenticate("jwt", { session: false }), transaction_controller_1.createTransaction);
router.get("/", passport_1.default.authenticate("jwt", { session: false }), transaction_controller_1.findAllTransactions);
router.get("/:id", passport_1.default.authenticate("jwt", { session: false }), transaction_controller_1.findOneTransaction);
router.put("/:id", passport_1.default.authenticate("jwt", { session: false }), transaction_controller_1.updateTransaction);
router.delete("/:id", passport_1.default.authenticate("jwt", { session: false }), transaction_controller_1.deleteTransaction);
exports.default = router;
