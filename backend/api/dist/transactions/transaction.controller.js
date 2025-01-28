"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.findOneTransaction = exports.findAllTransactions = exports.createTransaction = void 0;
const transaction_model_1 = __importDefault(require("./transaction.model"));
const categories_model_1 = __importDefault(require("../categories/categories.model"));
const budget_model_1 = __importDefault(require("../budgets/budget.model"));
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, amount } = req.body;
        const category = yield categories_model_1.default.findById(categoryId);
        if ((category === null || category === void 0 ? void 0 : category.type) &&
            category.type !== "income" &&
            category.type !== "savings") {
            const transaction_date = new Date();
            transaction_date.setHours(0, 0, 0, 0);
            //check if there's a budget for this transaction
            const budget = yield budget_model_1.default.findOne({
                categoryId,
                // amount: { $gt: amount },
                start_date: { $lte: transaction_date },
                end_date: { $gte: transaction_date },
            });
            if (!budget) {
                res.status(400).json({
                    message: "You do not have budget for this transaction!",
                });
                return;
            }
            //check if the budget is enough for the user's transaction
            const existingTransaction = yield transaction_model_1.default.find({
                categoryId,
                transaction_date: { $gte: budget.start_date, $lte: budget.end_date },
            });
            const totalTransactionAmount = existingTransaction.reduce((total, transaction) => {
                return total + transaction.amount;
            }, 0);
            const totalAmount = totalTransactionAmount + amount;
            if (totalAmount > budget.amount) {
                res.status(400).json({ message: "The amount exceed your budget!" });
                return;
            }
        }
        const transaction = new transaction_model_1.default(req.body);
        yield transaction.save();
        res
            .status(200)
            .json({ message: "Transaction created successfully!", transaction });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error!",
        });
    }
});
exports.createTransaction = createTransaction;
const findAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transaction_model_1.default.find();
        if (!transactions) {
            res.status(404).json({ message: "No transactions found!" });
            return;
        }
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error!",
        });
    }
});
exports.findAllTransactions = findAllTransactions;
const findOneTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transaction = yield transaction_model_1.default.findById(id);
        if (!transaction) {
            res.status(404).json({ message: "Transaction not found!" });
            return;
        }
        res.status(200).json(transaction);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error!",
        });
    }
});
exports.findOneTransaction = findOneTransaction;
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transaction = yield transaction_model_1.default.findByIdAndUpdate(id, req.body);
        if (!transaction) {
            res.status(404).json({ message: "Transaction not found!" });
            return;
        }
        res
            .status(200)
            .json({ message: "Transaction updated successfully!", transaction });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error!",
        });
    }
});
exports.updateTransaction = updateTransaction;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transaction = yield transaction_model_1.default.findByIdAndDelete(id);
        if (!transaction) {
            res.status(404).json({ message: "Transaction not found!" });
            return;
        }
        res.status(200).json({ message: "Transaction deleted!" });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error!",
        });
    }
});
exports.deleteTransaction = deleteTransaction;
