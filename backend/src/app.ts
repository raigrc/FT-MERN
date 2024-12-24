import express from "express";
import cors from "cors";
import userRouter from "./users/users.route";
import authRouter from "./auth/auth.route";
import passport from "./config/passport.config";

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api", authRouter);
app.use("/api/users", userRouter);

export default app;
