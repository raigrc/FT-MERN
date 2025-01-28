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
exports.deleteBudget = exports.updateBudget = exports.findOneBudget = exports.findAllBudgets = exports.createBudget = void 0;
const budget_model_1 = __importDefault(require("./budget.model"));
const createBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, categoryId, amount, start_date, end_date } = req.body;
        if (start_date >= end_date) {
            res.status(400).json({ message: "Invalid date format!" });
            return;
        }
        const existingBudget = yield budget_model_1.default.find({
            categoryId: categoryId,
        });
        if (existingBudget.length > 0) {
            const existingEndDate = existingBudget[0].end_date;
            if (new Date(end_date).getTime() <= new Date(existingEndDate).getTime()) {
                res
                    .status(400)
                    .json({ message: "You already have budget for this category!" });
                return;
            }
        }
        const budget = new budget_model_1.default({
            userId,
            categoryId,
            amount,
            start_date,
            end_date,
        });
        yield budget.save();
        res.status(201).json({ budget, message: "Successfully added budget!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createBudget = createBudget;
const findAllBudgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const budget = yield budget_model_1.default.find();
        if (!budget) {
            res.status(404).json({ message: "No budget found" });
            return;
        }
        res.status(200).json(budget);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.findAllBudgets = findAllBudgets;
const findOneBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const budget = yield budget_model_1.default.findById(id);
        if (!budget) {
            res.status(404).json({ message: "Budget not found" });
            return;
        }
        res.status(200).json(budget);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.findOneBudget = findOneBudget;
const updateBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const budget = yield budget_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!budget) {
            res.status(404).json({ message: "Budget not found!" });
        }
        res.status(200).json({ message: "Successfully updated budget!", budget });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.updateBudget = updateBudget;
const deleteBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const budget = yield budget_model_1.default.findByIdAndDelete(id);
        if (!budget) {
            res.status(404).json({ message: "Budget not found!" });
        }
        res.status(200).json({ message: "Successfully deleted budget!" });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.deleteBudget = deleteBudget;
