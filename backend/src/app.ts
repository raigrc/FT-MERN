import express from "express";
import cors from "cors";
import passport from "./config/passport.config";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//routes
import userRoutes from "./users/users.routes";
import authRoutes from "./auth/auth.route";
import categoryRoutes from "./categories/categories.routes";
import budgetRoutes from "./budgets/budget.routes";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
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

export default app;
