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
exports.signOut = exports.verifyToken = exports.login = void 0;
const users_model_1 = __importDefault(require("../users/users.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield users_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found!" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!passwordMatch) {
            return res.status(404).json({ message: "Invalid Password!" });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user === null || user === void 0 ? void 0 : user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000, // 1 hour
            sameSite: "lax",
        });
        res.status(200).json({ user, message: "Login successful!" });
    }
    catch (error) {
        console.error("Error during login:", error);
    }
});
exports.login = login;
const verifyToken = (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized!" });
            return;
        }
        res.status(200).json({ user: req.user });
    }
    catch (error) {
        console.error("Error during login:", error);
    }
};
exports.verifyToken = verifyToken;
const signOut = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Signout successful!" });
};
exports.signOut = signOut;
