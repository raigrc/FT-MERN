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
const categories_model_1 = __importDefault(require("../categories.model"));
const api = (0, supertest_1.default)(__1.default);
const mockCategories = [
    {
        userId: "user1",
        name: "category1",
        type: "income",
    },
    {
        userId: "user2",
        name: "category2",
        type: "expense",
    },
    {
        userId: "user3",
        name: "category3",
        type: "savings",
    },
];
const invalidTypeCategory = {
    userId: "user99",
    name: "category99",
    type: "invalidType",
};
jest.mock("passport", () => ({
    initialize: jest.fn(() => (req, res, next) => next()),
    use: jest.fn(),
    authenticate: jest.fn(() => (req, res, next) => {
        req.user = {
            _id: "user1",
        };
        next();
    }),
}));
describe("CRUD Categories", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clears call history of all mocks before each test
    });
    describe("POST /category", () => {
        it("should create new category", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCategory = mockCategories[0];
            categories_model_1.default.find = jest.fn().mockResolvedValue(null);
            categories_model_1.default.prototype.save = jest.fn().mockResolvedValue(mockCategory);
            const response = yield api.post("/api/category").send(mockCategory);
            expect(response.status).toBe(200);
            expect(response.body.category).toHaveProperty("name", "category1");
            expect(response.body.category).toHaveProperty("type", "income");
            expect(response.body).toHaveProperty("message", "Category added successfully!");
        }));
        it("should return error if type is not expense, income, or savings", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield api
                .post("/api/category")
                .send(invalidTypeCategory);
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Category type must be income, expense, or savings!");
        }));
    });
    describe("GET /category", () => {
        it("should get all categories", () => __awaiter(void 0, void 0, void 0, function* () {
            categories_model_1.default.find = jest.fn().mockResolvedValue(mockCategories);
            const response = yield api.get("/api/category");
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(3);
            expect(response.body[0]).toHaveProperty("name", "category1");
            expect(response.body[1]).toHaveProperty("name", "category2");
            expect(response.body[2]).toHaveProperty("name", "category3");
        }));
        it("should get one category", () => __awaiter(void 0, void 0, void 0, function* () {
            categories_model_1.default.findById = jest.fn().mockResolvedValue(mockCategories[0]);
            const response = yield api.get("/api/category/1");
            console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("userId", "user1");
            expect(response.body).toHaveProperty("name", "category1");
            expect(response.body).toHaveProperty("type", "income");
        }));
        it("should get 404 or no category found", () => __awaiter(void 0, void 0, void 0, function* () {
            categories_model_1.default.findById = jest.fn().mockResolvedValue(null);
            const response = yield api.get("/api/category/1");
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("message", "Category not found!");
        }));
    });
    describe("UPDATE /category", () => {
        it("should update specific category", () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedMockCategory = {
                userId: "10",
                name: "category10",
                type: "expense",
            };
            categories_model_1.default.findByIdAndUpdate = jest
                .fn()
                .mockResolvedValue(Object.assign(Object.assign({}, mockCategories[0]), updatedMockCategory));
            const response = yield api
                .put("/api/category/1")
                .send(updatedMockCategory);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "Successfully updated category!");
        }));
        it("should return error if type is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            categories_model_1.default.findByIdAndUpdate = jest
                .fn()
                .mockResolvedValue(Object.assign(Object.assign({}, mockCategories[0]), invalidTypeCategory));
            const response = yield api.put("/api/category/1");
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Category type must be income, expense, or savings!");
        }));
        it("should return error if no category found", () => __awaiter(void 0, void 0, void 0, function* () {
            categories_model_1.default.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
            const response = yield api.put("/api/category/1");
            console.log(response.body);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("message", "Category not found!");
        }));
    });
    describe("DELETE /category", () => {
        it("should delete category", () => __awaiter(void 0, void 0, void 0, function* () {
            categories_model_1.default.findByIdAndDelete = jest
                .fn()
                .mockResolvedValue(mockCategories[0]);
            const response = yield api.delete("/api/category/1");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "Successfully deleted category!");
        }));
        it("should return error if no category found", () => __awaiter(void 0, void 0, void 0, function* () {
            categories_model_1.default.findByIdAndDelete = jest.fn().mockResolvedValue(null);
            const response = yield api.put("/api/category/1");
            console.log(response.body);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("message", "Category not found!");
        }));
    });
});
