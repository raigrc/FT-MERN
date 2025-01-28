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
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require("../.."));
const budget_model_1 = __importDefault(require("../budget.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const api = (0, supertest_1.default)(__1.default);
const mockBudgets = [
    {
        userId: new mongoose_1.default.Types.ObjectId(),
        categoryId: new mongoose_1.default.Types.ObjectId(),
        amount: 500,
        start_date: new Date(2025, 0, 10),
        end_date: new Date(2025, 0, 11),
    },
    {
        userId: new mongoose_1.default.Types.ObjectId(),
        categoryId: new mongoose_1.default.Types.ObjectId(),
        amount: 1000,
        start_date: new Date(2025, 0, 12),
        end_date: new Date(2025, 0, 13),
    },
    {
        userId: new mongoose_1.default.Types.ObjectId(),
        categoryId: new mongoose_1.default.Types.ObjectId(),
        amount: 1500,
        start_date: new Date(2025, 0, 14),
        end_date: new Date(2025, 0, 15),
    },
];
const invalidBudgetDate = {
    userId: new mongoose_1.default.Types.ObjectId(),
    categoryId: new mongoose_1.default.Types.ObjectId(),
    amount: 1500,
    start_date: new Date(2025, 0, 11),
    end_date: new Date(2025, 0, 10),
};
jest.mock("passport", () => ({
    initialize: jest.fn(() => (req, res, next) => next()),
    use: jest.fn(),
    authenticate: jest.fn(() => (req, res, next) => {
        req.user = {
            _id: new mongoose_1.default.Types.ObjectId(),
        };
        next();
    }),
}));
describe("CRUD Budgets", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("POST /budgets", () => {
        it("should create new budget", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockBudget = mockBudgets[0];
            budget_model_1.default.find = jest.fn().mockResolvedValue(null);
            budget_model_1.default.prototype.save = jest.fn().mockResolvedValue(mockBudget);
            const response = yield api.post("/api/budgets").send(mockBudget);
            console.log(response.body);
            expect(response.status).toBe(201);
            expect(response.body.budget).toHaveProperty("userId");
            expect(response.body.budget).toHaveProperty("categoryId");
            expect(response.body.budget).toHaveProperty("amount", 500);
            expect(response.body.budget).toHaveProperty("start_date");
            expect(response.body.budget).toHaveProperty("end_date");
            expect(response.body).toHaveProperty("message", "Successfully added budget!");
        }));
        it("should return error if start date is greater than end date", () => __awaiter(void 0, void 0, void 0, function* () {
            budget_model_1.default.findOne = jest.fn().mockResolvedValue(invalidBudgetDate);
            const response = yield api.post("/api/budgets").send(invalidBudgetDate);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Invalid date format!");
        }));
        it("should return error if existing budget", () => __awaiter(void 0, void 0, void 0, function* () {
            budget_model_1.default.find = jest.fn().mockResolvedValue([mockBudgets[0]]);
            const mockBudget = mockBudgets[0];
            const response = yield api.post("/api/budgets").send(mockBudget);
            console.log(response.body);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "You already have budget for this category!");
        }));
    });
});
