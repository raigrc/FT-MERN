import supertest from "supertest";
import app from "../../app";
import Budgets from "../budget.model";
import mongoose from "mongoose";

const api = supertest(app);

const mockBudgets = [
  {
    userId: new mongoose.Types.ObjectId(),
    categoryId: new mongoose.Types.ObjectId(),
    amount: 500,
    start_date: new Date(2025, 0, 10),
    end_date: new Date(2025, 0, 11),
  },
  {
    userId: new mongoose.Types.ObjectId(),
    categoryId: new mongoose.Types.ObjectId(),
    amount: 1000,
    start_date: new Date(2025, 0, 12),
    end_date: new Date(2025, 0, 13),
  },
  {
    userId: new mongoose.Types.ObjectId(),
    categoryId: new mongoose.Types.ObjectId(),
    amount: 1500,
    start_date: new Date(2025, 0, 14),
    end_date: new Date(2025, 0, 15),
  },
];

const invalidBudgetDate = {
  userId: new mongoose.Types.ObjectId(),
  categoryId: new mongoose.Types.ObjectId(),
  amount: 1500,
  start_date: new Date(2025, 0, 11),
  end_date: new Date(2025, 0, 10),
};

jest.mock("passport", () => ({
  initialize: jest.fn(() => (req: any, res: any, next: any) => next()),
  use: jest.fn(),
  authenticate: jest.fn(() => (req: any, res: any, next: any) => {
    req.user = {
      _id: new mongoose.Types.ObjectId(),
    };
    next();
  }),
}));

describe("CRUD Budgets", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("POST /budgets", () => {
    it("should create new budget", async () => {
      const mockBudget = mockBudgets[0];

      Budgets.find = jest.fn().mockResolvedValue(null);
      Budgets.prototype.save = jest.fn().mockResolvedValue(mockBudget);

      const response = await api.post("/api/budgets").send(mockBudget);
      console.log(response.body);

      expect(response.status).toBe(201);
      expect(response.body.budget).toHaveProperty("userId");
      expect(response.body.budget).toHaveProperty("categoryId");
      expect(response.body.budget).toHaveProperty("amount", 500);
      expect(response.body.budget).toHaveProperty("start_date");
      expect(response.body.budget).toHaveProperty("end_date");
      expect(response.body).toHaveProperty(
        "message",
        "Successfully added budget!"
      );
    });

    it("should return error if start date is greater than end date", async () => {
      Budgets.findOne = jest.fn().mockResolvedValue(invalidBudgetDate);

      const response = await api.post("/api/budgets").send(invalidBudgetDate);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid date format!");
    });

    it("should return error if existing budget", async () => {
      Budgets.find = jest.fn().mockResolvedValue([mockBudgets[0]]);

      const mockBudget = mockBudgets[0];

      const response = await api.post("/api/budgets").send(mockBudget);
      console.log(response.body);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "You already have budget for this category!"
      );
    });
  });
});
