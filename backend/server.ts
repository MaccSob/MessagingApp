import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./auth"
import conversationsRouter from "./conversations.js";
import { requireAuth } from "./middleware.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/conversations", requireAuth, conversationsRouter);
app.use("/auth/me", requireAuth); // add this before app.use("/auth", authRouter)

app.use("/auth", authRouter);

app.listen(4000, () => console.log("✅ running on http://localhost:4000"));