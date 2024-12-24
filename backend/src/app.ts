import express from "express";
import cors from "cors";
import userRoutes from "./users/users.route";
import authRoutes from "./auth/auth.route";
import passport from "./config/passport.config";

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);

export default app;
