"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post("/", users_controller_1.createUser);
router.get("/", passport_1.default.authenticate("jwt", { session: false }), users_controller_1.findAllUser);
router.get("/:id", passport_1.default.authenticate("jwt", { session: false }), users_controller_1.findOneUser);
router.put("/:id", passport_1.default.authenticate("jwt", { session: false }), users_controller_1.updateUser);
router.delete("/:id", passport_1.default.authenticate("jwt", { session: false }), users_controller_1.deleteUser);
exports.default = router;
