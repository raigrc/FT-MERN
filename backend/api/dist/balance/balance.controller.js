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
exports.getTransactionsByMonth = exports.getTransactionsWithCategories = exports.getOneCategory = exports.getCategories = exports.getBudgets = exports.getAllBalance = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const transaction_model_1 = __importDefault(require("../transactions/transaction.model"));
const budget_model_1 = __importDefault(require("../budgets/budget.model"));
const categories_model_1 = __importDefault(require("../categories/categories.model"));
const getAllBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const totalIncome = yield transaction_model_1.default.aggregate([
        { $match: { userId: new mongoose_1.default.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
            },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        { $match: { "category.type": "income" } },
        { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);
    const totalExpense = yield transaction_model_1.default.aggregate([
        { $match: { userId: new mongoose_1.default.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
            },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        { $match: { "category.type": "expense" } },
        { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
    ]);
    const totalSavings = yield transaction_model_1.default.aggregate([
        { $match: { userId: new mongoose_1.default.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
            },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        { $match: { "category.type": "savings" } },
        { $group: { _id: null, totalSavings: { $sum: "$amount" } } },
    ]);
    const totalIncomeAmount = totalIncome.length > 0 ? totalIncome[0].totalIncome : 0;
    const totalExpenseAmount = totalExpense.length > 0 ? totalExpense[0].totalExpense : 0;
    const totalSavingsAmount = totalSavings.length > 0 ? totalSavings[0].totalSavings : 0;
    // Calculate the total balance
    const totalBalance = totalIncomeAmount - totalExpenseAmount;
    res.json({
        totalSavings: totalSavingsAmount,
        totalExpense: totalExpenseAmount,
        totalBalance,
    });
});
exports.getAllBalance = getAllBalance;
const getBudgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const { categoryName } = req.query;
    const matchCategoryName = categoryName
        ? { "category.name": { $regex: categoryName, $options: "i" } }
        : {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const budgets = yield budget_model_1.default.aggregate([
        {
            $match: Object.assign({ userId: new mongoose_1.default.Types.ObjectId(userId), start_date: { $lte: today }, end_date: { $gte: today } }, matchCategoryName),
        },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
            },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "transactions",
                // localField: "categoryId",
                // foreignField: "categoryId",
                let: {
                    categoryId: "$categoryId",
                    start_date: "$start_date",
                    end_date: "$end_date",
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$categoryId", "$$categoryId"] },
                                    { $gte: ["$transaction_date", "$$start_date"] },
                                    { $lte: ["$transaction_date", "$$end_date"] },
                                ],
                            },
                        },
                    },
                ],
                as: "transactions",
            },
        },
        { $addFields: { totalSpent: { $sum: "$transactions.amount" } } },
    ]);
    res.json(budgets);
});
exports.getBudgets = getBudgets;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const { name } = req.query;
    const matchName = name ? { name: { $regex: name, $options: "i" } } : {};
    const categories = yield categories_model_1.default.aggregate([
        { $match: Object.assign({ userId: new mongoose_1.default.Types.ObjectId(userId) }, matchName) },
        {
            $lookup: {
                from: "transactions",
                localField: "_id",
                foreignField: "categoryId",
                as: "transactions",
            },
        },
        { $addFields: { totalTransactions: { $size: "$transactions" } } },
        { $sort: { totalTransactions: -1, name: 1 } },
    ]);
    res.json(categories);
});
exports.getCategories = getCategories;
const getOneCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user._id;
    const category = yield categories_model_1.default.aggregate([
        {
            $match: {
                userId: new mongoose_1.default.Types.ObjectId(userId),
                _id: new mongoose_1.default.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: "transactions",
                localField: "_id",
                foreignField: "categoryId",
                as: "transactions",
            },
        },
        { $addFields: { totalTransactions: { $size: "$transactions" } } },
    ]);
    res.json(category);
});
exports.getOneCategory = getOneCategory;
const getTransactionsWithCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { search } = req.query;
    const matchSearch = search
        ? { description: { $regex: search, $options: "i" } }
        : {};
    const totalTransactions = yield transaction_model_1.default.countDocuments({
        userId: new mongoose_1.default.Types.ObjectId(userId),
    });
    const transactions = yield transaction_model_1.default.aggregate([
        { $sort: { transaction_date: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "categories",
            },
        },
        { $unwind: { path: "$categories", preserveNullAndEmptyArrays: true } },
        { $match: Object.assign({ userId: new mongoose_1.default.Types.ObjectId(userId) }, matchSearch) },
        // {
        //   $project: {
        //     amount: 1,
        //     description: 1,
        //     transaction_date: 1,
        //     categories: {
        //       name: 1,
        //       type: 1,
        //     },
        //   },
        // },
    ]);
    const totalPages = Math.ceil(totalTransactions / limit);
    res.json({
        totalPages,
        transactions,
        page,
        limit,
    });
});
exports.getTransactionsWithCategories = getTransactionsWithCategories;
const getTransactionsByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const transactions = yield transaction_model_1.default.aggregate([
        { $match: { userId: new mongoose_1.default.Types.ObjectId(userId) } },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category",
            },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        {
            $group: {
                _id: {
                    transaction_date: {
                        $dateToString: { format: "%Y-%m", date: "$transaction_date" },
                    },
                    // type: "$category.type",
                },
                expense: {
                    $sum: {
                        $cond: [{ $eq: ["$category.type", "expense"] }, "$amount", 0],
                    },
                },
                income: {
                    $sum: {
                        $cond: [{ $eq: ["$category.type", "income"] }, "$amount", 0],
                    },
                },
                // totalAmount: { $sum: "$amount" },
                // transactions: { $push: "$$ROOT" }, //! DO NOT NEED THIS FOR NOW
            },
        },
        { $sort: { _id: 1 } },
    ]);
    res.json(transactions);
});
exports.getTransactionsByMonth = getTransactionsByMonth;
