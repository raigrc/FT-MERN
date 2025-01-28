"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.login);
router.get("/verify", passport_1.default.authenticate("jwt", { session: false }), auth_controller_1.verifyToken);
router.get("/signout", passport_1.default.authenticate("jwt", { session: false }), auth_controller_1.signOut);
exports.default = router;
