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
exports.deleteUser = exports.updateUser = exports.findOneUser = exports.findAllUser = exports.createUser = void 0;
const users_model_1 = __importDefault(require("./users.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//create
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const userExist = yield users_model_1.default.findOne({ email });
        if (userExist) {
            res.status(400).json({ message: "User already exist!" });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = new users_model_1.default({ name, email, password: hashedPassword });
        yield user.save();
        res.status(201).json({ user: user, message: "User created successfully!" });
    }
    catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
});
exports.createUser = createUser;
//read
const findAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_model_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.findAllUser = findAllUser;
const findOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield users_model_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found!" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.findOneUser = findOneUser;
//update
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield users_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!user)
            res.status(404).json({ message: "User not found!" });
        res.status(200).json({ user, message: "User updated successfully!" });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.updateUser = updateUser;
//delete
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield users_model_1.default.findByIdAndDelete(id);
        if (!user)
            res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "Successfully deleted user!" });
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.deleteUser = deleteUser;
