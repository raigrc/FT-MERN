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
import balanceRoutes from "./balance/balance.routes";
import transactionRoutes from "./transactions/transaction.routes";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: ["https://ft-mern-client.vercel.app", "http://localhost:5713"],
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

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error));


export default app;
