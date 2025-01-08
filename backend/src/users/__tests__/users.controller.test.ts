import supertest from "supertest";
import app from "../../app";
import User from "../users.model";
import passport, { authenticate } from "passport";
import { NextFunction, Request, Response } from "express";

// jest.mock("../users.model.ts");

const api = supertest(app);

describe("CRUD Functions", () => {
  describe("POST /users", () => {
    it("should create a new user", async () => {
      const mockUser = {
        name: "test",
        email: "test@gmail.com",
        password: "hashedPassword",
      };

      User.findOne = jest.fn().mockResolvedValue(null);
      User.prototype.save = jest.fn().mockResolvedValue(mockUser);

      const response = await api.post("/api/users").send(mockUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("user");
      expect(response.body.message).toBe("User created successfully!");
    });

    it("should return 400 if user already exists", async () => {
      const mockUser = {
        name: "test",
        email: "test@gmail.com",
        password: "hashedPassword",
      };

      User.findOne = jest.fn().mockResolvedValue(mockUser);

      const response = await api.post("/api/users").send(mockUser);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User already exist!");
    });
  });

  // describe("GET /users", () => {
  //   it("should get all users", async () => {
  //     const mockUsers = [
  //       {
  //         _id: 1,
  //         name: "test1",
  //         email: "test1@gmail.com",
  //         password: "hashedPassword1",
  //       },
  //       {
  //         _id: 2,
  //         name: "test2",
  //         email: "test2@gmail.com",
  //         password: "hashedPassword2",
  //       },
  //     ];
  //     User.find = jest.fn().mockResolvedValue(mockUsers);
  //     const response = await api
  //       .get("/api/users")
  //       .set("Cookie", "token=validToken");

  //     console.log(response.body);

  //     expect(response.status).toBe(200);
  //     expect(response.body).toBeInstanceOf(Array);
  //     expect(response.body.length).toBe(2);
  //     expect(response.body[0]).toHaveProperty("name", "test1");
  //     expect(response.body[1]).toHaveProperty("name", "test2");
  //   });
  // });
});
