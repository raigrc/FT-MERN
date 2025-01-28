"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const passport_config_1 = __importDefault(require("./config/passport.config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
//routes
const users_routes_1 = __importDefault(require("./users/users.routes"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const categories_routes_1 = __importDefault(require("./categories/categories.routes"));
const budget_routes_1 = __importDefault(require("./budgets/budget.routes"));
const balance_routes_1 = __importDefault(require("./balance/balance.routes"));
const transaction_routes_1 = __importDefault(require("./transactions/transaction.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["https://ft-mern-zeta.vercel.app/", "http://localhost:5713"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(passport_config_1.default.initialize());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", auth_route_1.default);
app.use("/api/users", users_routes_1.default);
app.use("/api/category", categories_routes_1.default);
app.use("/api/budgets", budget_routes_1.default);
app.use("/api/transactions", transaction_routes_1.default);
app.use("/api/balance", balance_routes_1.default);
exports.default = app;
