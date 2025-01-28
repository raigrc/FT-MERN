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
const users_model_1 = __importDefault(require("../users.model"));
// jest.mock("../users.model.ts");
const api = (0, supertest_1.default)(__1.default);
jest.mock("passport", () => ({
    initialize: jest.fn(() => (req, res, next) => next()),
    use: jest.fn(),
    authenticate: () => (req, res, next) => {
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
        it("should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
            users_model_1.default.findOne = jest.fn().mockResolvedValue(null);
            users_model_1.default.prototype.save = jest.fn().mockResolvedValue(mockUser);
            const response = yield api.post("/api/users").send(mockUser);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("user");
            expect(response.body.message).toBe("User created successfully!");
        }));
        it("should return 400 if user already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            users_model_1.default.findOne = jest.fn().mockResolvedValue(mockUser);
            const response = yield api.post("/api/users").send(mockUser);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe("User already exist!");
        }));
    });
    describe("GET /users", () => {
        it("should get all users", () => __awaiter(void 0, void 0, void 0, function* () {
            users_model_1.default.find = jest.fn().mockResolvedValue(mockUsers);
            const response = yield api.get("/api/users");
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(2);
            expect(response.body[0]).toHaveProperty("name", "test1");
            expect(response.body[1]).toHaveProperty("name", "test2");
        }));
        it("should get one user", () => __awaiter(void 0, void 0, void 0, function* () {
            users_model_1.default.findById = jest.fn().mockResolvedValue(mockUsers[0]);
            const response = yield api.get("/api/users/1");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("name", "test1");
            expect(response.body).toHaveProperty("email", "test1@gmail.com");
        }));
        it("should get 404 or no users found", () => __awaiter(void 0, void 0, void 0, function* () {
            users_model_1.default.findById = jest.fn().mockResolvedValue(null);
            const response = yield api.get(`/api/users/1`);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("message", "User not found!");
        }));
    });
    describe("PUT /users", () => {
        const updatedUser = {
            _id: "1",
            name: "test3",
            email: "test3@gmail.com",
            password: "hashedPassword3",
        };
        it("should update user's data", () => __awaiter(void 0, void 0, void 0, function* () {
            users_model_1.default.findByIdAndUpdate = jest
                .fn()
                .mockResolvedValue(Object.assign(Object.assign({}, mockUsers[0]), updatedUser));
            const response = yield api.put("/api/users/1").send(updatedUser);
            expect(response.status).toBe(200);
            expect(response.body.user).toHaveProperty("name", "test3");
            expect(response.body.user).toHaveProperty("email", "test3@gmail.com");
            expect(response.body.message).toBe("User updated successfully!");
        }));
    });
    describe("DELETE /users", () => {
        it("should delete existing user", () => __awaiter(void 0, void 0, void 0, function* () {
            users_model_1.default.findByIdAndDelete = jest.fn().mockResolvedValue(mockUsers[0]);
            const response = yield api.delete("/api/users/1");
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Successfully deleted user!");
        }));
    });
});
