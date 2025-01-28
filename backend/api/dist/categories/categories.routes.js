"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_1 = require("./categories.controller");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post("/", passport_1.default.authenticate("jwt", { session: false }), categories_controller_1.createCategory);
router.get("/", passport_1.default.authenticate("jwt", { session: false }), categories_controller_1.findAllCategories);
router.get("/:id", passport_1.default.authenticate("jwt", { session: false }), categories_controller_1.findOneCategory);
router.put("/:id", passport_1.default.authenticate("jwt", { session: false }), categories_controller_1.updateCategory);
router.delete("/:id", passport_1.default.authenticate("jwt", { session: false }), categories_controller_1.deleteCategory);
exports.default = router;
