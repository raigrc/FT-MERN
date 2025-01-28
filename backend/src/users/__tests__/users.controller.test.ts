import supertest from "supertest";
import app from "../../..";
import User from "../users.model";

// jest.mock("../users.model.ts");

const api = supertest(app);

jest.mock("passport", () => ({
  initialize: jest.fn(() => (req: any, res: any, next: any) => next()),
  use: jest.fn(),
  authenticate: () => (req: any, res: any, next: any) => {
    req.user = {
      _id: "1",
    }; // Mock user data to bypass authentication
    next();
  },
}));

// jest.mock("passport-jwt", () => ({
//   ExtractJwt: {
//     fromExtractors: jest.fn().mockReturnValue((req: any) => req.cookies.token),
//   },
//   Strategy: jest.fn(),
// }));

describe("CRUD Users", () => {
  // const token = jwt.sign(
  //   { _id: "60f5c0f3d5f3c2408f1b4d91" },
  //   process.env.JWT_SECRET!,
  //   {
  //     expiresIn: "1h",
  //   }
  // );

  const mockUsers = [
    {
      _id: "1",
      name: "test1",
      email: "test1@gmail.com",
      password: "hashedPassword1",
    },
    {
      _id: "2",
      name: "test2",
      email: "test2@gmail.com",
      password: "hashedPassword2",
    },
  ];

  describe("POST /users", () => {
    const mockUser = {
      name: "test",
      email: "test@gmail.com",
      password: "hashedPassword",
    };
    it("should create a new user", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      User.prototype.save = jest.fn().mockResolvedValue(mockUser);

      const response = await api.post("/api/users").send(mockUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("user");
      expect(response.body.message).toBe("User created successfully!");
    });

    it("should return 400 if user already exists", async () => {
      User.findOne = jest.fn().mockResolvedValue(mockUser);

      const response = await api.post("/api/users").send(mockUser);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User already exist!");
    });
  });

  describe("GET /users", () => {
    it("should get all users", async () => {
      User.find = jest.fn().mockResolvedValue(mockUsers);

      const response = await api.get("/api/users");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty("name", "test1");
      expect(response.body[1]).toHaveProperty("name", "test2");
    });

    it("should get one user", async () => {
      User.findById = jest.fn().mockResolvedValue(mockUsers[0]);

      const response = await api.get("/api/users/1");

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "test1");
      expect(response.body).toHaveProperty("email", "test1@gmail.com");
    });

    it("should get 404 or no users found", async () => {
      User.findById = jest.fn().mockResolvedValue(null);

      const response = await api.get(`/api/users/1`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "User not found!");
    });
  });

  describe("PUT /users", () => {
    const updatedUser = {
      _id: "1",
      name: "test3",
      email: "test3@gmail.com",
      password: "hashedPassword3",
    };
    it("should update user's data", async () => {
      User.findByIdAndUpdate = jest
        .fn()
        .mockResolvedValue({ ...mockUsers[0], ...updatedUser });

      const response = await api.put("/api/users/1").send(updatedUser);

      expect(response.status).toBe(200);
      expect(response.body.user).toHaveProperty("name", "test3");
      expect(response.body.user).toHaveProperty("email", "test3@gmail.com");
      expect(response.body.message).toBe("User updated successfully!");
    });
  });

  describe("DELETE /users", () => {
    it("should delete existing user", async () => {
      User.findByIdAndDelete = jest.fn().mockResolvedValue(mockUsers[0]);

      const response = await api.delete("/api/users/1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Successfully deleted user!");
    });
  });
});
