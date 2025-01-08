import supertest from "supertest";
import app from "../../app";
import Categories from "../categories.model";

const api = supertest(app);

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
  initialize: jest.fn(() => (req: any, res: any, next: any) => next()),
  use: jest.fn(),
  authenticate: jest.fn(() => (req: any, res: any, next: any) => {
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
    it("should create new category", async () => {
      const mockCategory = mockCategories[0];

      Categories.find = jest.fn().mockResolvedValue(null);
      Categories.prototype.save = jest.fn().mockResolvedValue(mockCategory);

      const response = await api.post("/api/category").send(mockCategory);

      expect(response.status).toBe(200);
      expect(response.body.category).toHaveProperty("name", "category1");
      expect(response.body.category).toHaveProperty("type", "income");
      expect(response.body).toHaveProperty(
        "message",
        "Category added successfully!"
      );
    });

    it("should return error if type is not expense, income, or savings", async () => {
      const response = await api
        .post("/api/category")
        .send(invalidTypeCategory);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Category type must be income, expense, or savings!"
      );
    });
  });

  describe("GET /category", () => {
    it("should get all categories", async () => {
      Categories.find = jest.fn().mockResolvedValue(mockCategories);

      const response = await api.get("/api/category");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(3);
      expect(response.body[0]).toHaveProperty("name", "category1");
      expect(response.body[1]).toHaveProperty("name", "category2");
      expect(response.body[2]).toHaveProperty("name", "category3");
    });

    it("should get one category", async () => {
      Categories.findById = jest.fn().mockResolvedValue(mockCategories[0]);

      const response = await api.get("/api/category/1");
      console.log(response.body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("userId", "user1");
      expect(response.body).toHaveProperty("name", "category1");
      expect(response.body).toHaveProperty("type", "income");
    });

    it("should get 404 or no category found", async () => {
      Categories.findById = jest.fn().mockResolvedValue(null);

      const response = await api.get("/api/category/1");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Category not found!");
    });
  });

  describe("UPDATE /category", () => {
    it("should update specific category", async () => {
      const updatedMockCategory = {
        userId: "10",
        name: "category10",
        type: "expense",
      };

      Categories.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue({ ...mockCategories[0], ...updatedMockCategory });

      const response = await api
        .put("/api/category/1")
        .send(updatedMockCategory);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Successfully updated category!"
      );
    });

    it("should return error if type is invalid", async () => {
      Categories.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue({ ...mockCategories[0], ...invalidTypeCategory });

      const response = await api.put("/api/category/1");

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Category type must be income, expense, or savings!"
      );
    });

    it("should return error if no category found", async () => {
      Categories.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const response = await api.put("/api/category/1");

      console.log(response.body);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Category not found!");
    });
  });

  describe("DELETE /category", () => {
    it("should delete category", async () => {
      Categories.findByIdAndDelete = jest
        .fn()
        .mockResolvedValue(mockCategories[0]);

      const response = await api.delete("/api/category/1");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Successfully deleted category!"
      );
    });
    it("should return error if no category found", async () => {
      Categories.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      const response = await api.put("/api/category/1");

      console.log(response.body);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Category not found!");
    });
  });
});
