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
exports.deleteCategory = exports.updateCategory = exports.findOneCategory = exports.findAllCategories = exports.createCategory = void 0;
const categories_model_1 = __importDefault(require("./categories.model"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, name, type } = req.body;
        if (!name || !type) {
            res.status(400).json({ message: "All fields are required!" });
            return;
        }
        if (type !== "income" && type !== "expense" && type !== "savings") {
            res.status(400).json({
                message: "Category type must be income, expense, or savings!",
            });
            return;
        }
        const category = new categories_model_1.default({ userId, name, type });
        yield category.save();
        res.status(200).json({ category, message: "Category added successfully!" });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error!",
        });
    }
});
exports.createCategory = createCategory;
const findAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { type } = req.query;
        const categories = yield categories_model_1.default.find(Object.assign({ userId }, (type ? { type } : {})));
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error!",
        });
    }
});
exports.findAllCategories = findAllCategories;
const findOneCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield categories_model_1.default.findById(id);
        if (!category) {
            res.status(404).json({ message: "Category not found!" });
            return;
        }
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error!",
        });
    }
});
exports.findOneCategory = findOneCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield categories_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!category) {
            res.status(404).json({ message: "Category not found!" });
            return;
        }
        if (req.body.type !== "income" &&
            req.body.type !== "expense" &&
            req.body.type !== "savings") {
            res.status(400).json({
                message: "Category type must be income, expense, or savings!",
            });
            return;
        }
        res
            .status(200)
            .json({ message: "Successfully updated category!", category });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error!",
        });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield categories_model_1.default.findByIdAndDelete(id);
        if (!category) {
            res.status(404).json({ message: "Category not found!" });
            return;
        }
        res.status(200).json({ message: "Successfully deleted category!" });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error!",
        });
    }
});
exports.deleteCategory = deleteCategory;
