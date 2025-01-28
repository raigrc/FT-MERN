import express from "express";
import cors from "cors";
import passport from "./src/config/passport.config";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//routes
import userRoutes from "./src/users/users.routes";
import authRoutes from "./src/auth/auth.route";
import categoryRoutes from "./src/categories/categories.routes";
import budgetRoutes from "./src/budgets/budget.routes";
import balanceRoutes from "./src/balance/balance.routes";
import transactionRoutes from "./src/transactions/transaction.routes";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["https://ft-mern-zeta.vercel.app", "http://localhost:5713"],
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/balance", balanceRoutes);

export default app;
